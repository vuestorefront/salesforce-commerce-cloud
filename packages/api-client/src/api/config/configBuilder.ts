import { buildConfig as buildCapiConfig } from './capiConfig';
import { buildConfig as buildOcapiConfig } from './ocapiConfig';
import { createClientProxy } from '../clients/factory';
import { OcapiSiteApi } from '../clients/site';
import { CapiCartsApi, OcapiCartsApi } from '../clients/carts';
import { CapiOrdersApi, OcapiOrdersApi } from '../clients/orders';
import { CapiCustomersApi, OcapiCustomersApi } from '../clients/customers';
import { CapiCategoriesApi, OcapiCategoriesApi } from '../clients/categories';
import { CapiProductsApi, OcapiProductsApi } from '../clients/products';
import { CapiWishlistsApi, OcapiWishlistsApi } from '../clients/wishlists';
import { CapiProductSearchApi, OcapiProductSearchApi } from '../clients/productSearch';
import { CapiCustomersPasswordResetApi, OcapiCustomersPasswordResetApi } from '../clients/customersPasswordReset';
import { ApiClients, ApiClientSettings } from '../../types';
import {
  SiteApi,
  CartsApi,
  OrdersApi,
  CustomersApi,
  CategoriesApi,
  ProductsApi,
  WishlistsApi,
  ProductSearchApi,
  CustomersPasswordResetApi
} from '../clients/interfaces';

export const buildClientConfig = (settings: ApiClientSettings): ApiClients => {
  const capiConfig = buildCapiConfig(settings);
  const ocapiConfig = buildOcapiConfig(settings);

  return {
    SiteApi: createClientProxy<SiteApi>(
      settings,
      null,
      new OcapiSiteApi(ocapiConfig)
    ),

    CartsApi: createClientProxy<CartsApi>(
      settings,
      new CapiCartsApi(capiConfig),
      new OcapiCartsApi(ocapiConfig)
    ),

    OrdersApi: createClientProxy<OrdersApi>(
      settings,
      new CapiOrdersApi(capiConfig),
      new OcapiOrdersApi(ocapiConfig)
    ),

    CustomersApi: createClientProxy<CustomersApi>(
      settings,
      new CapiCustomersApi(capiConfig, ocapiConfig),
      new OcapiCustomersApi(capiConfig, ocapiConfig)
    ),

    CustomersPasswordResetApi: createClientProxy<CustomersPasswordResetApi>(
      settings,
      new CapiCustomersPasswordResetApi(settings, capiConfig),
      new OcapiCustomersPasswordResetApi(settings, ocapiConfig)
    ),

    ProductsApi: createClientProxy<ProductsApi>(
      settings,
      new CapiProductsApi(capiConfig),
      new OcapiProductsApi(ocapiConfig)
    ),

    WishlistsApi: createClientProxy<WishlistsApi>(
      settings,
      new CapiWishlistsApi(capiConfig),
      new OcapiWishlistsApi(ocapiConfig)
    ),

    CategoriesApi: createClientProxy<CategoriesApi>(
      settings,
      new CapiCategoriesApi(capiConfig),
      new OcapiCategoriesApi(ocapiConfig)
    ),

    ProductSearchApi: createClientProxy<ProductSearchApi>(
      settings,
      new CapiProductSearchApi(capiConfig),
      new OcapiProductSearchApi(ocapiConfig)
    )
  };
};
