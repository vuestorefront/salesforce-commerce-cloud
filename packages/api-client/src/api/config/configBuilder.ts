import { buildConfig as buildCapiConfig } from './capiConfig';
import { buildConfig as buildOcapiConfig } from './ocapiConfig';
import { CapiCartsApi, OcapiCartsApi } from '../clients/carts';
import { CapiOrdersApi, OcapiOrdersApi } from '../clients/orders';
import { CapiCustomersApi, OcapiCustomersApi } from '../clients/customers';
import { CapiCategoriesApi, OcapiCategoriesApi } from '../clients/categories';
import { CapiProductsApi, OcapiProductsApi } from '../clients/products';
import { CapiWishlistsApi, OcapiWishlistsApi } from '../clients/wishlists';
import { CapiProductSearchApi, OcapiProductSearchApi } from '../clients/productSearch';
import { ApiClients, ApiClientSettings } from '../../types';

export const buildClientConfig = (settings: ApiClientSettings): ApiClients => {
  const capiConfig = buildCapiConfig(settings);
  const ocapiConfig = buildOcapiConfig(settings);

  const clients: Partial<ApiClients> = {};

  if (settings.enableCommerceApi) {
    clients.CartsApi = new CapiCartsApi(capiConfig);
    clients.OrdersApi = new CapiOrdersApi(capiConfig);
    clients.CustomersApi = new CapiCustomersApi(capiConfig);
    clients.ProductsApi = new CapiProductsApi(capiConfig);
    clients.WishlistsApi = new CapiWishlistsApi(capiConfig);
    clients.CategoriesApi = new CapiCategoriesApi(capiConfig);
    clients.ProductSearchApi = new CapiProductSearchApi(capiConfig);
  } else {
    clients.CartsApi = new OcapiCartsApi(ocapiConfig);
    clients.OrdersApi = new OcapiOrdersApi(ocapiConfig);
    clients.CustomersApi = new OcapiCustomersApi(ocapiConfig);
    clients.ProductsApi = new OcapiProductsApi(ocapiConfig);
    clients.WishlistsApi = new OcapiWishlistsApi(ocapiConfig);
    clients.CategoriesApi = new OcapiCategoriesApi(ocapiConfig);
    clients.ProductSearchApi = new OcapiProductSearchApi(ocapiConfig);
  }

  return clients as ApiClients;
};
