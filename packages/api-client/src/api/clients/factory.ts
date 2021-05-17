import { ApiClientSettings } from '../../types';

export function createClientProxy<T>(
  config: ApiClientSettings,
  capiClient: T,
  ocapiClient: T
): T {
  return new Proxy({}, {
    get(_, prop) {
      if (!capiClient || config.ocapiEndpoints[prop]) {
        return ocapiClient[prop].bind(ocapiClient);
      }

      return async function capiMethodWrapper (...args: any[]) {
        try {
          return await capiClient[prop].call(capiClient, ...args);
        } catch (e) {
          // Throw the actual response body instead of the SDK wrapper
          // and prevent Axios from overwriting it in the Error's 'response' property
          if (e.response && e.response.text) {
            throw (await e.response.text());
          }

          throw e;
        }
      };
    }
  }) as T;
}
