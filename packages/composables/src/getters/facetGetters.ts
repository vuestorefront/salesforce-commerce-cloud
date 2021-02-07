import { SearchData } from '../types';
import {
  Product,
  ProductSearchRefinement,
  ProductSearchRefinementValue,
  ProductSortingOption
} from '@vue-storefront/sfcc-api';
import {
  FacetsGetters,
  AgnosticBreadcrumb,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticFacet,
  AgnosticSort,
  AgnosticPagination
} from '@vue-storefront/core';

const mapFilterValueToAgnosticFacet = (filter: ProductSearchRefinement, value: ProductSearchRefinementValue): AgnosticFacet => ({
  type: 'attribute',
  attrName: filter.attributeId,
  id: value.value,
  value: value.value,
  count: value.hitCount,
  selected: value.selected
});

const mapFilterToGroupedFacet = (filter: ProductSearchRefinement): AgnosticGroupedFacet => ({
  id: filter.attributeId,
  label: filter.label,
  options: filter.values.map(mapFilterValueToAgnosticFacet.bind(null, filter))
});

const getAll = (searchData: SearchData): AgnosticFacet[] => {
  if (!searchData.data) {
    return [];
  }

  return searchData.data.facets.reduce((acc, filter) => [
    ...acc,
    ...mapFilterToGroupedFacet(filter).options
  ], []);
};

const getGrouped = (searchData: SearchData): AgnosticGroupedFacet[] => {
  if (!searchData.data) {
    return [];
  }

  return searchData.data.facets.map(mapFilterToGroupedFacet);
};

const mapSortOptionToAgnosticFacet = (sortOption: ProductSortingOption): AgnosticFacet => ({
  ...sortOption,
  type: 'sort',
  value: sortOption.label,
  attrName: sortOption.label
});

const getSortOptions = (searchData: SearchData): AgnosticSort => {
  if (!searchData.data) {
    return {
      options: [],
      selected: null
    };
  }

  const options = searchData.data.sortOptions.map(mapSortOptionToAgnosticFacet);
  const selectedOption = options.find((option) => option.selected) || options[0];
  const selected = selectedOption && selectedOption.id;

  return {
    options,
    selected
  };
};

const mapCategoryToAgnosticTree = (category: ProductSearchRefinementValue): AgnosticCategoryTree => ({
  label: category.label,
  isCurrent: category.selected,
  slug: category.presentationId || category.value,
  items: (category.values && category.values.map(mapCategoryToAgnosticTree)) || []
});

const getCategoryTree = (searchData: SearchData): AgnosticCategoryTree => {
  if (!searchData.data || !searchData.data.categories) {
    return {
      isCurrent: false,
      label: '',
      items: []
    };
  }

  return {
    isCurrent: false,
    label: searchData.data.categories.label,
    items: searchData.data.categories.values.map(mapCategoryToAgnosticTree)
  };
};

const getProducts = (searchData: SearchData): Product[] => {
  if (!searchData.data) {
    return [];
  }

  return searchData.data.products;
};

const getPagination = (searchData: SearchData): AgnosticPagination => {
  if (!searchData.data) {
    return {
      totalItems: 0,
      currentPage: 1,
      itemsPerPage: 0,
      pageOptions: [],
      totalPages: 1
    };
  }

  return {
    totalItems: searchData.data.total,
    currentPage: searchData.input.page,
    itemsPerPage: searchData.data.itemsPerPage,
    pageOptions: searchData.data.perPageOptions,
    totalPages: Math.ceil(searchData.data.total / searchData.data.itemsPerPage) || 1
  };
};

const getSelectedCategoryPath = (categories: ProductSearchRefinementValue[], selectedCategories?: ProductSearchRefinementValue[]): ProductSearchRefinementValue[] => {
  const selected = categories.reduce((acc, category) => {
    if (category.selected) {
      return [...acc, category];
    }

    if (category.values) {
      const selectedSubcategories = getSelectedCategoryPath(category.values || []);

      if (selectedSubcategories.length) {
        return [...acc, category, ...selectedSubcategories];
      }
    }

    return acc;
  }, []);

  return (selectedCategories || []).concat(selected);
};

const getBreadcrumbs = (searchData: SearchData): AgnosticBreadcrumb[] => {
  let selectedCategoryPath = [];

  if (searchData.data && searchData.data.categories) {
    selectedCategoryPath = getSelectedCategoryPath(searchData.data.categories.values);
  }

  return [{
    text: 'Home',
    link: '/'
  }].concat(selectedCategoryPath.map((category) => ({
    text: category.label,
    link: `/c/${category.id}`
  })));
};

const facetGetters: FacetsGetters<any, any> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};

export default facetGetters;
