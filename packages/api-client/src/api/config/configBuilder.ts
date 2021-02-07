import { buildConfig as buildCapiConfig } from './capiConfig';
import { buildConfig as buildOcapiConfig } from './ocapiConfig';
import { CapiCustomersApi, OcapiCustomersApi } from '../clients/customers';
import { CapiCategoriesApi, OcapiCategoriesApi } from '../clients/categories';
import { ApiClients, ApiClientSettings } from '../../types';

export const buildClientConfig = (settings: ApiClientSettings): ApiClients => {
  const capiConfig = buildCapiConfig(settings);
  const ocapiConfig = buildOcapiConfig(settings);

  const clients: Partial<ApiClients> = {};

  if (settings.enableCommerceApi) {
    clients.CustomersApi = new CapiCustomersApi(capiConfig);
    clients.CategoriesApi = new CapiCategoriesApi(capiConfig);
  } else {
    clients.CustomersApi = new OcapiCustomersApi(ocapiConfig);
    clients.CategoriesApi = new OcapiCategoriesApi(ocapiConfig);
  }

  return clients as ApiClients;
};
