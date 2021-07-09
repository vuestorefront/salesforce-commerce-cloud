import { Search } from 'commerce-sdk';

import {
  Product,
  ProductSearchParams,
  ProductSearchResponse,
  ProductSearchRefinement,
  ProductSearchRefinementValue,
  ProductSortingOption
} from '../../../types';

export type SearchProductsParameters = {
    q?: string;
    refine?: Array<string>;
    sort?: string;
    currency?: string;
    locale?: string;
    offset?: any;
    limit?: number;
};

const mapSearchHit = (productHit: Search.ShopperSearch.ProductSearchHit): Product => ({
  _id: productHit.productId,
  _description: '',
  _categoriesRef: [],
  name: productHit.productName,
  sku: productHit.productId,
  images: (productHit.image && [productHit.image.disBaseLink]) || [],
  price: {
    original: productHit.priceMax,
    current: productHit.price
  }
});

const parsePriceRefinementValue = (value: string): { min: number; max: number } => {
  const parsedValue = value.replace('(', '').replace(')', '').split('..').map((str) => parseInt(str, 10));

  return {
    min: parsedValue[0],
    max: parsedValue[1]
  };
};

const searchFilterValueSelected = (
  value: Search.ShopperSearch.ProductSearchRefinementValue,
  attr: string,
  selectedValuesResponse: Record<string, string> | null
): boolean => {
  if (selectedValuesResponse) {
    const selectedAttrValue = selectedValuesResponse[attr];

    if (selectedAttrValue) {
      if (attr === 'price') {
        const selectedRange = parsePriceRefinementValue(selectedAttrValue);
        const currentRange = parsePriceRefinementValue(value.value);

        return currentRange.min >= selectedRange.min && currentRange.max <= selectedRange.max;
      }

      return selectedAttrValue.split('|').includes(value.value);
    }
  }

  return false;
};

const mapSearchFilterValue = (
  apiResponse: Search.ShopperSearch.ProductSearchResult,
  refinement: Search.ShopperSearch.ProductSearchRefinement,
  refinementValue: Search.ShopperSearch.ProductSearchRefinementValue
): ProductSearchRefinementValue => ({
  ...refinementValue,
  selected: searchFilterValueSelected(refinementValue, refinement.attributeId, apiResponse.selectedRefinements),
  values: refinementValue.values && refinementValue.values.map(mapSearchFilterValue.bind(null, apiResponse, refinement))
});

const mapSearchFilter = (
  apiResponse: Search.ShopperSearch.ProductSearchResult,
  refinement: Search.ShopperSearch.ProductSearchRefinement
): ProductSearchRefinement => ({
  ...refinement,
  values: refinement.values.map(mapSearchFilterValue.bind(null, apiResponse, refinement))
});

const mapSearchFilterSelectedValues = (selectedValues: Record<string, string>): Record<string, string[]> => {
  if (selectedValues) {
    return Object.entries(selectedValues).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value.split('|')
    }), {});
  }

  return {};
};

const mapSearchSortOption = (apiResponse: Search.ShopperSearch.ProductSearchResult, sortOption: Search.ShopperSearch.ProductSearchSortingOption): ProductSortingOption => ({
  ...sortOption,
  selected: sortOption.id === apiResponse.selectedSortingOption
});

const mergePriceRefinementValues = (values: string[]): string => {
  const minPrice = values.reduce((min, value) => {
    const parsedValue = parsePriceRefinementValue(value);

    if (parsedValue.min < min) {
      return parsedValue.min;
    }

    return min;
  }, Number.MAX_SAFE_INTEGER);

  const maxPrice = values.reduce((max, value) => {
    const parsedValue = parsePriceRefinementValue(value);

    if (parsedValue.max > max) {
      return parsedValue.max;
    }

    return max;
  }, Number.MIN_SAFE_INTEGER);

  return `(${minPrice}..${maxPrice})`;
};

export const mapSearchResponse = (apiResponse: Search.ShopperSearch.ProductSearchResult): ProductSearchResponse => ({
  products: (apiResponse.hits || []).map(mapSearchHit),
  filters: (apiResponse.refinements || []).filter((refinement) => refinement.values).map(mapSearchFilter.bind(null, apiResponse)),
  selectedFilters: mapSearchFilterSelectedValues(apiResponse.selectedRefinements),
  sortOptions: (apiResponse.sortingOptions || []).map(mapSearchSortOption.bind(null, apiResponse)),
  total: apiResponse.total
});

export const buildSearchOptions = (params: ProductSearchParams, locale?: string, currency?: string): SearchProductsParameters => {
  const searchOptions: SearchProductsParameters = {
    q: params.q,
    sort: params.sort,
    locale: locale,
    currency: currency,
    offset: (params.page - 1) * params.itemsPerPage,
    limit: params.itemsPerPage,
    refine: []
  };

  if (params.categorySlug) {
    searchOptions.refine.push(`cgid=${params.categorySlug}`);
  }

  if (params.filters) {
    if (params.filters.promoId) {
      searchOptions.refine.push(`pmid=${params.filters.promoId}`);
    }

    if (params.filters.hitType) {
      searchOptions.refine.push(`htypes=${params.filters.hitType.join('|')}`);
    }

    if (params.filters.orderableOnly) {
      searchOptions.refine.push(`orderable_only=${params.filters.orderableOnly.toString()}`);
    }

    if (params.filters.attributes) {
      const attrRefinements = Object.keys(params.filters.attributes).map((attrId) => {
        let attrValue = params.filters.attributes[attrId];

        if (Array.isArray(attrValue)) {
          if (attrId === 'price' && attrValue.length > 1) {
            attrValue = [mergePriceRefinementValues(attrValue)];
          }

          return `${attrId}=${attrValue.join('|')}`;
        }

        return `${attrId}=${attrValue}`;
      });

      searchOptions.refine = searchOptions.refine.concat(attrRefinements);
    }
  }

  return searchOptions;
};
