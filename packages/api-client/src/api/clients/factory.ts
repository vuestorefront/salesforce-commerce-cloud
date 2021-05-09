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

      return capiClient[prop].bind(capiClient);
    }
  }) as T;
}
