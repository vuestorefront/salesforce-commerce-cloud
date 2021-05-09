import { ClientConfig } from 'commerce-sdk';
import { ApiClientSettings } from '../../types';

export function buildConfig(apiConfig: ApiClientSettings): ClientConfig {
  const clientConfig: ClientConfig = {
    headers: {},
    parameters: {
      siteId: apiConfig.siteId,
      clientId: apiConfig.capiClientId,
      shortCode: apiConfig.shortCode,
      organizationId: apiConfig.organizationId,
      version: apiConfig.commerceApiVersion
    }
  };

  if (apiConfig.capiJwtToken) {
    clientConfig.headers.authorization = `Bearer ${apiConfig.capiJwtToken}`;
  }

  if (!apiConfig.cache) {
    clientConfig.cacheManager = null;
  }

  return clientConfig;
}
