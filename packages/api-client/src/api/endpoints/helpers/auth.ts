import { decode } from 'js-base64';
import { SfccIntegrationContext } from '../../../types';

type JwtPayload = {
  sub: string;
  exp: number;
};

type JwtSubject = {
  customer_info?: {
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
    const isGuest = !subject || !subject.customer_info || subject.customer_info.guest;

    return { expiryTime, isGuest };
  }

  return {};
};

const handleTokenExpiry = async (context: SfccIntegrationContext): Promise<string> => {
  const token = context.config.jwtToken;

  if (!token) {
    return await context.client.CustomersApi.guestSignIn();
  }

  const { expiryTime, isGuest } = getJwtTokenState(token);

  const now = new Date().getTime();
  const afterAboutToExpireWindow = now + (1 * 60 * 1000);

  const expired = expiryTime < now;
  const isAboutToExpire = !expired && expiryTime < afterAboutToExpireWindow;

  if (isAboutToExpire) {
    return await context.client.CustomersApi.refreshToken();
  }

  if (expired) {
    const token = await context.client.CustomersApi.guestSignIn();

    if (context.config.callbacks.auth.onSessionTimeout) {
      context.config.callbacks.auth.onSessionTimeout(isGuest);
    }

    return token;
  }

  return token;
};

type Endpoint = (...args: any) => Promise<any>

export function wrapAuthHandler<T extends Record<keyof T, Endpoint>>(endpoints: T) {
  return Object.keys(endpoints).reduce((acc, callName) => ({
    ...acc,
    [callName]: new Proxy(endpoints[callName], {
      apply: async function (target, thisArg, args) {
        const context: SfccIntegrationContext = args[0];
        const currentToken = context.config.jwtToken;

        if (!unauthenticatedModules.includes(callName)) {
          const newToken = await handleTokenExpiry(context);

          if (newToken !== currentToken) {
            context.config.callbacks.auth.onTokenChange(newToken);
          }
        }

        return await target.apply(thisArg, [context, ...args.slice(1)]);
      }
    }),
  }), {});
}
