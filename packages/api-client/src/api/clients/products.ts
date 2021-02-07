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

  protected buildGetProductOptions(locale?: string): ShopApi.GetProductOptions {
    return {
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
    };
  }

  async getProduct(id: string, viewType?: string, locale?: string): Promise<Product> {
    const productResponse = await this.api.getProductsByID(id, this.buildGetProductOptions(locale));

    return mapOcapiProduct(productResponse, viewType);
  }

  async getProducts(ids: string[], viewType?: string, locale?: string): Promise<Product[]> {
    const productResponse = await this.api.getProductsByIDs(ids, this.buildGetProductOptions(locale));

    return productResponse.data.map(
      (product) => mapOcapiProduct(product, viewType)
    );
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

  async getProducts(ids: string[], viewType?: string, locale?: string): Promise<Product[]> {
    const productResponse = await this.api.getProducts({
      parameters: {
        locale,
        ids: ids.join(','),
        allImages: true
      }
    });

    return productResponse.data.map(
      (product) => mapProduct(product, viewType)
    );
  }
}
