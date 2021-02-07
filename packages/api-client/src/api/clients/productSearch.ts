import ShopApi from 'commercecloud-ocapi-client';
import { ClientConfig, Search } from 'commerce-sdk';

import { ProductSearchApi } from './interfaces';
import { ProductSearchParams, ProductSearchResponse } from '../../types';
import { buildSearchOptions, mapSearchResponse } from '../mapping/shared/searchMapping';
import { buildOcapiSearchOptions, mapOcapiSearchResponse } from '../mapping/ocapi/ocapiSearchMapping';

export class OcapiProductSearchApi implements ProductSearchApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.ProductSearchApi;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.ProductSearchApi();
  }

  async searchProducts(params: ProductSearchParams, locale?: string): Promise<ProductSearchResponse> {
    const searchOptions = buildOcapiSearchOptions(params, locale);
    const response = await this.api.getProductSearch(searchOptions);

    return mapOcapiSearchResponse(response);
  }
}

export class CapiProductSearchApi implements ProductSearchApi {
  protected config: ClientConfig;
  protected api: Search.ShopperSearch;

  constructor(config: ClientConfig) {
    this.config = config;
    this.api = new Search.ShopperSearch(config);
  }

  async searchProducts(params: ProductSearchParams, locale?: string): Promise<ProductSearchResponse> {
    const response = await this.api.productSearch({
      parameters: buildSearchOptions(params, locale)
    });

    return mapSearchResponse(response);
  }
}
