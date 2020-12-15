import ShopApi from 'commercecloud-ocapi-client';
import { apiClientFactory } from '@vue-storefront/core';

import { buildClientConfig } from './api/config/configBuilder';
import { buildConfig as buildOcapiConfig } from './api/config/ocapiConfig';
import { ApiClientSettings, Endpoints, SfccSetupConfig } from './types';

import api from './api/endpoints';
import extensions from './api/extensions';

const onCreate = (config: ApiClientSettings): SfccSetupConfig => {
  const ocapiClient = new ShopApi.ApiClient(buildOcapiConfig(config));

  ShopApi.ApiClient.instance = ocapiClient;

  return {
    api: {},
    config,
    client: buildClientConfig(config)
  };
};

const { createApiClient } = apiClientFactory<ApiClientSettings, Endpoints>({
  onCreate,
  api,
  extensions
});

export {
  createApiClient
};

export * from './types';
