import ShopApi from 'commercecloud-ocapi-client';
import { ApiClientSettings } from '../../types';

export function buildConfig(apiConfig: ApiClientSettings): ShopApi.ApiConfig {
  const ocapiConfig: ShopApi.ApiConfig = {
    basePath: `${apiConfig.origin}/s/${apiConfig.siteId}/dw/shop/v${apiConfig.ocapiVersion}`,
    timeout: apiConfig.timeout,
    cache: apiConfig.cache,
    enableCookies: false,
    overrideHttpPut: true,
    oauth2AccessToken: apiConfig.ocapiJwtToken,
    defaultHeaders: {}
  };

  if (apiConfig.ocapiClientId) {
    ocapiConfig.defaultHeaders['x-dw-client-id'] = apiConfig.ocapiClientId;
  }

  return ocapiConfig;
}
