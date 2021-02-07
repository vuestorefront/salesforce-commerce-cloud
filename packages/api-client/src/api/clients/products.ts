import ShopApi from 'commercecloud-ocapi-client';
import { ClientConfig, Product as ProductApi } from 'commerce-sdk';

import { Product } from '../../types';
import { ProductsApi } from './interfaces';
import { mapProduct } from '../mapping/shared/productMapping';
import { mapOcapiProduct } from '../mapping/ocapi/ocapiProductMapping';

export class OcapiProductsApi implements ProductsApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.ProductsApi;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.ProductsApi();
  }

  async getProduct(id: string, viewType?: string, locale?: string): Promise<Product> {
    const productResponse = await this.api.getProductsByID(id, {
      locale,
      allImages: true,
      expand: [
        'availability',
        'bundled_products',
        'links',
        'promotions',
        'options',
        'images',
        'prices',
        'variations',
        'set_products'
      ]
    });

    return mapOcapiProduct(productResponse, viewType);
  }
}

export class CapiProductsApi implements ProductsApi {
  protected config: ClientConfig;
  protected api: ProductApi.ShopperProducts;

  constructor(config: ClientConfig) {
    this.config = config;
    this.api = new ProductApi.ShopperProducts(config);
  }

  async getProduct(id: string, viewType?: string, locale?: string): Promise<Product> {
    const productResponse = await this.api.getProduct({
      parameters: {
        id,
        locale,
        allImages: true
      }
    });

    return mapProduct(productResponse, viewType);
  }
}
