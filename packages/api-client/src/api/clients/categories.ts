import ShopApi from 'commercecloud-ocapi-client';
import { ClientConfig, Product } from 'commerce-sdk';

import { Category } from '../../types';
import { CategoriesApi } from './interfaces';
import { mapOcapiCategory } from '../mapping/ocapi/ocapiCategoryMapping';

export class OcapiCategoriesApi implements CategoriesApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.CategoriesApi;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.CategoriesApi();
  }

  async getCategory(id: string, levels?: number, locale?: string): Promise<Category> {
    const category = await this.api.getCategoriesByID(id, {
      levels,
      locale
    });

    return mapOcapiCategory(category);
  }
}

export class CapiCategoriesApi implements CategoriesApi {
  protected config: ClientConfig;
  protected api: Product.ShopperProducts;

  constructor(config: ClientConfig) {
    this.config = config;
    this.api = new Product.ShopperProducts(config);
  }

  async getCategory(id: string, levels?: number, locale?: string): Promise<Category> {
    const category = await this.api.getCategory({
      parameters: {
        id,
        levels,
        locale
      }
    });

    return category as Category;
  }
}
