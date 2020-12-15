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
}

export default {
  name: 'sfcc-config',
  hooks: (req: Request, res: Response) => ({
    beforeCreate: ({ configuration }: { configuration: ApiClientSettings }) => {
      let jwtToken = null;

      configuration.locale = req.headers[configuration.clientHeaders.locale] as string;

      Object.defineProperty(configuration, 'jwtToken', {
        enumerable: true,
        configurable: true,
        get() {
          return updateTokenIssuer(
            jwtToken || req.cookies[configuration.cookieNames.authToken],
            null,
            configuration.clientId
          );
        },
        set(newToken: string) {
          jwtToken = updateTokenIssuer(newToken, configuration.clientId, null);
          res.cookie(configuration.cookieNames.authToken, jwtToken);
        }
      })

      if (!configuration.callbacks.auth.onTokenChange) {
        configuration.callbacks.auth.onTokenChange = (newToken: string) => {
          configuration.jwtToken = newToken;
        };
      }

      return configuration;
    }
  })
} as ApiClientExtension;
