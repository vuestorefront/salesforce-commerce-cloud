import { buildConfig as buildCapiConfig } from './capiConfig';
import { buildConfig as buildOcapiConfig } from './ocapiConfig';
import { CapiCustomersApi, OcapiCustomersApi } from '../clients/customers';
import { CapiCategoriesApi, OcapiCategoriesApi } from '../clients/categories';
import { CapiProductSearchApi, OcapiProductSearchApi } from '../clients/productSearch';
import { ApiClients, ApiClientSettings } from '../../types';

export const buildClientConfig = (settings: ApiClientSettings): ApiClients => {
  const capiConfig = buildCapiConfig(settings);
  const ocapiConfig = buildOcapiConfig(settings);

  const clients: Partial<ApiClients> = {};

  if (settings.enableCommerceApi) {
    clients.CustomersApi = new CapiCustomersApi(capiConfig);
    clients.CategoriesApi = new CapiCategoriesApi(capiConfig);
    clients.ProductSearchApi = new CapiProductSearchApi(capiConfig);
  } else {
    clients.CustomersApi = new OcapiCustomersApi(ocapiConfig);
    clients.CategoriesApi = new OcapiCategoriesApi(ocapiConfig);
    clients.ProductSearchApi = new OcapiProductSearchApi(ocapiConfig);
  }

  return clients as ApiClients;
};
