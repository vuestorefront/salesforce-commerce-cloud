import { decode } from 'js-base64';
import { SfccIntegrationContext } from '../../../types';
import { TokensResponse } from '../../clients/interfaces';

type JwtPayload = {
  sub: string;
  exp: number;
};

type JwtSubject = {
  // eslint-disable-next-line camelcase
  customer_info?: {
    guest?: boolean;
  },
  CustomerInfo?: {
    guest?: boolean;
  }
};

const unauthenticatedModules = [
  'guestSignIn',
  'refreshToken'
];

const getJwtTokenState = (token: string) => {
  if (token) {
    const [, encodedPayload] = token.split('.');
    const payload: JwtPayload = JSON.parse(decode(encodedPayload)) as JwtPayload;
    const subject: JwtSubject = JSON.parse(payload.sub) as JwtSubject;

    const expiryTime = payload.exp * 1000;
    const customerInfo = subject && (subject.customer_info || subject.CustomerInfo);
    const isGuest = !customerInfo || customerInfo.guest;

    const now = new Date().getTime();
    const afterAboutToExpireWindow = now + (1 * 60 * 1000);

    const isExpired = expiryTime < now;
    const isAboutToExpire = !isExpired && expiryTime < afterAboutToExpireWindow;

    return { isGuest, isExpired, isAboutToExpire };
  }

  return {};
};

const handleTokenExpiry = async (context: SfccIntegrationContext): Promise<TokensResponse> => {
  const capiToken = context.config.capiJwtToken;
  const ocapiToken = context.config.ocapiJwtToken;

  if (!capiToken || !ocapiToken) {
    return await context.client.CustomersApi.guestSignIn();
  }

  const {
    isGuest: capiIsGuest,
    isExpired: capiIsExpired,
    isAboutToExpire: capiIsAboutToExpire
  } = getJwtTokenState(capiToken);

  const {
    isGuest: ocapiIsGuest,
    isExpired: ocapiIsExpired,
    isAboutToExpire: ocapiIsAboutToExpire
  } = getJwtTokenState(ocapiToken);

  if (capiIsAboutToExpire || ocapiIsAboutToExpire) {
    return await context.client.CustomersApi.refreshToken();
  }

  if (capiIsExpired || ocapiIsExpired) {
    const tokens = await context.client.CustomersApi.guestSignIn();

    if (context.config.callbacks.auth.onSessionTimeout) {
      context.config.callbacks.auth.onSessionTimeout(capiIsGuest || ocapiIsGuest);
    }

    return tokens;
  }

  return {
    capiToken,
    ocapiToken
  };
};

type Endpoint = (...args: any) => Promise<any>

export function wrapAuthHandler<T extends Record<keyof T, Endpoint>>(endpoints: T) {
  return Object.keys(endpoints).reduce((acc, callName) => ({
    ...acc,
    [callName]: new Proxy(endpoints[callName], {
      apply: async function apply(target, thisArg, args) {
        const context: SfccIntegrationContext = args[0];

        if (!unauthenticatedModules.includes(callName)) {
          const { capiToken, ocapiToken } = await handleTokenExpiry(context);

          if (capiToken !== context.config.capiJwtToken || ocapiToken !== context.config.ocapiJwtToken) {
            context.config.callbacks.auth.onTokenChange(capiToken, ocapiToken);
          }
        }

        return await target.apply(thisArg, [context, ...args.slice(1)]);
      }
    })
  }), {});
}
