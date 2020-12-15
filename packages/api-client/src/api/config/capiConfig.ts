import { ClientConfig } from 'commerce-sdk';
import { ApiClientSettings } from '../../types';

export function buildConfig(apiConfig: ApiClientSettings): ClientConfig {
  const clientConfig: ClientConfig = {
    headers: {},
    parameters: {
      siteId: apiConfig.siteId,
      clientId: apiConfig.clientId,
      shortCode: apiConfig.shortCode,
      organizationId: apiConfig.organizationId,
      version: apiConfig.commerceApiVersion
    }
  };

  if (apiConfig.jwtToken) {
    clientConfig.headers.authorization = `Bearer ${apiConfig.jwtToken}`;
  }

  if (!apiConfig.cache) {
    clientConfig.cacheManager = null;
  }

  return clientConfig;
}
