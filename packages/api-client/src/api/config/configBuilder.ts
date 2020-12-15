import { buildConfig as buildCapiConfig } from './capiConfig';
import { buildConfig as buildOcapiConfig } from './ocapiConfig';
import { CapiCustomersApi, OcapiCustomersApi } from '../clients/customers';
import { ApiClients, ApiClientSettings } from '../../types';

export const buildClientConfig = (settings: ApiClientSettings): ApiClients => {
  const capiConfig = buildCapiConfig(settings);
  const ocapiConfig = buildOcapiConfig(settings);

  const clients: Partial<ApiClients> = {};

  if (settings.enableCommerceApi) {
    clients.CustomersApi = new CapiCustomersApi(capiConfig);
  } else {
    clients.CustomersApi = new OcapiCustomersApi(ocapiConfig);
  }

  return clients as ApiClients;
};
