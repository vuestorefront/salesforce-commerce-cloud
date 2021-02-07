import { Product as SdkProduct } from 'commerce-sdk';
import { Product as ApiProduct } from 'commercecloud-ocapi-client';

import { Product } from '../../../types';
import { baseMapping } from './ocapiBaseMapping';
import { mapProduct } from '../shared/productMapping';

export const mapOcapiProduct = (apiProduct: ApiProduct, viewType?: string): Product => mapProduct(
  baseMapping<SdkProduct.ShopperProducts.Product>(apiProduct),
  viewType
);
