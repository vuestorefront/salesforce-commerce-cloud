import { FacetResultsData } from '../types';
import { Context, ProductSearchParams } from '@vue-storefront/sfcc-api';
import { useFacetFactory, FacetSearchResult } from '@vue-storefront/core';

const factoryParams = {
  search: async (context: Context, params: FacetSearchResult<FacetResultsData>): Promise<FacetResultsData> => {
    const apiParams: ProductSearchParams = {
      ...params.input,
      page: params.input.page || 1,
      itemsPerPage: params.input.itemsPerPage || 20,
      filters: {
        promoId: params.input.metadata && params.input.metadata.promoId,
        hitType: params.input.metadata && params.input.metadata.hitType,
        orderableOnly: params.input.metadata && params.input.metadata.orderableOnly,
        attributes: params.input.filters
      }
    };

    const searchResult = await context.$sfcc.api.searchProducts(apiParams);

    return {
      total: searchResult.total,
      categories: searchResult.filters.find((filter) => filter.attributeId === 'cgid'),
      facets: searchResult.filters.filter((filter) => filter.attributeId !== 'cgid'),
      sortOptions: searchResult.sortOptions,
      perPageOptions: [20, 40, 100],
      products: searchResult.products,
      itemsPerPage: params.input.itemsPerPage
    };
  }
};

export default useFacetFactory<FacetResultsData>(factoryParams);
