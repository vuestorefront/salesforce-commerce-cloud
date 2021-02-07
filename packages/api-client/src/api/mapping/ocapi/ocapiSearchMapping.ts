import { Search } from 'commerce-sdk';

import {
  ProductSearchOptions,
  ProductSearchResult
} from 'commercecloud-ocapi-client';

import {
  ProductSearchParams,
  ProductSearchResponse
} from '../../../types';

import { baseMapping } from './ocapiBaseMapping';
import { buildSearchOptions, mapSearchResponse } from '../shared/searchMapping';

export const mapOcapiSearchResultToGenericSearchResult = (apiResponse: ProductSearchResult): Search.ShopperSearch.ProductSearchResult => ({
  ...baseMapping<Search.ShopperSearch.ProductSearchResult>(apiResponse),
  limit: apiResponse.count,
  offset: apiResponse.start
});

export const mapOcapiSearchResponse = (apiResponse: ProductSearchResult): ProductSearchResponse => mapSearchResponse(
  mapOcapiSearchResultToGenericSearchResult(apiResponse)
);

export const buildOcapiSearchOptions = (params: ProductSearchParams, locale?: string): ProductSearchOptions => {
  const genericOptions = buildSearchOptions(params, locale);

  return {
    ...genericOptions,
    start: genericOptions.offset,
    count: genericOptions.limit,
    expand: [
      'availability',
      'images',
      'prices',
      'represented_products',
      'variations'
    ]
  };
};
