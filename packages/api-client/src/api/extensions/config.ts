import type { Request, Response } from 'express';

import { encode, decode } from 'js-base64';
import { ApiClientExtension } from '@vue-storefront/core';
import { ApiClientSettings } from '../../types';

const updateTokenIssuer = (token: string, compareIssuer: string, targetIssuer: string) => {
  if (token) {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    const payload = encodedPayload && JSON.parse(decode(encodedPayload));

    if (payload && payload.iss === compareIssuer) {
      const updatedPayload = { ...payload, iss: targetIssuer };
      const encodedUpdatedPayload = encode(JSON.stringify(updatedPayload), true);

      return `${encodedHeader}.${encodedUpdatedPayload}.${signature}`;
    }

    return token;
  }

  return null;
};

export default {
  name: 'sfcc-config',
  hooks: (req: Request, res: Response) => ({
    beforeCreate: ({ configuration }: { configuration: ApiClientSettings }) => {
      configuration.callbacks = configuration.callbacks || {};
      configuration.callbacks.auth = configuration.callbacks.auth || {};
      configuration.ocapiEndpoints = configuration.ocapiEndpoints || {};
      configuration.locale = req.headers[configuration.clientHeaders.locale] as string;
      configuration.currency = req.headers[configuration.clientHeaders.currency] as string;

      Object.defineProperty(configuration, 'capiJwtToken', {
        enumerable: true,
        configurable: true,
        get() {
          const headerName = configuration.clientHeaders.capiAuthToken;
          const cookieName = configuration.cookieNames.capiAuthToken;

          return req.headers[headerName] || req.cookies[cookieName];
        },
        set(newToken: string) {
          res.set(configuration.clientHeaders.capiAuthToken, newToken);
        }
      });

      Object.defineProperty(configuration, 'ocapiJwtToken', {
        enumerable: true,
        configurable: true,
        get() {
          const headerName = configuration.clientHeaders.ocapiAuthToken;
          const cookieName = configuration.cookieNames.ocapiAuthToken;

          return updateTokenIssuer(
            req.headers[headerName] || req.cookies[cookieName],
            null,
            configuration.ocapiClientId
          );
        },
        set(newToken: string) {
          res.set(
            configuration.clientHeaders.ocapiAuthToken,
            updateTokenIssuer(newToken, configuration.ocapiClientId, null)
          );
        }
      });

      if (!configuration.callbacks.auth.onTokenChange) {
        configuration.callbacks.auth.onTokenChange = (newCapiToken: string, newOcapiToken) => {
          if (newCapiToken) {
            configuration.capiJwtToken = newCapiToken;
          }

          if (newOcapiToken) {
            configuration.ocapiJwtToken = newOcapiToken;
          }
        };
      }

      return configuration;
    }
  })
} as ApiClientExtension;
