import 'vue-router';
import { Vue } from 'vue/types/vue';
import { Dictionary } from 'vue-router/types/router';
import { getCurrentInstance } from '@vue/composition-api';
import { AgnosticFacetSearchParams, AgnosticCategoryTree, AgnosticFacet } from '@vue-storefront/core';

const nonFilters = ['page', 'sort', 'itemsPerPage'];

const getContext = (): Vue => {
  const vm = getCurrentInstance();
  return vm.$root;
};

const reduceFilters = (query: Dictionary<string | string[]>) => (prev: Record<string, string[]>, curr: string): Record<string, string[]> => {
  const val = query[curr];
  const value = (Array.isArray(val) ? val : [val]).map(decodeURIComponent);

  return {
    ...prev,
    [curr]: value
  } as Record<string, string[]>;
};

const getFiltersDataFromUrl = (context: Vue, onlyFilters: boolean): Record<string, string[]> => {
  const { query } = context.$router.currentRoute;

  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

const useUiHelpers = () => {
  const context = getContext();

  const getFacetsFromURL = (): AgnosticFacetSearchParams => {
    const { query, params } = context.$router.currentRoute;

    const categorySlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

    return {
      categorySlug,
      page: parseInt(query.page as string, 10) || 1,
      sort: query.sort as string,
      filters: getFiltersDataFromUrl(context, true),
      itemsPerPage: parseInt(query.itemsPerPage as string, 10) || 20
    };
  };

  const getCatLink = (category: AgnosticCategoryTree): string => {
    return '/c/' + category.slug;
  };

  const changeSorting = (sort: string): void => {
    const { query } = context.$router.currentRoute;
    context.$router.push({ query: { ...query, sort } });
  };

  const changeFilters = (filters: Record<string, string[]>): void => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        ...filters
      }
    });
  };

  const changeItemsPerPage = (itemsPerPage: string): void => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        itemsPerPage
      }
    });
  };

  const changeSearchTerm = (term: string) => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        term: term || undefined
      }
    });
  };

  const isFacetColor = (facet: AgnosticFacet): boolean => facet.id === 'c_color' || facet.id === 'c_refinementColor';

  const isFacetCheckbox = (): boolean => false;

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    changeSearchTerm,
    isFacetColor,
    isFacetCheckbox
  };
};

export default useUiHelpers;
