import {
  AgnosticBreadcrumb,
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { Product, Variant, VariationAttributeValue } from '@vue-storefront/sfcc-api';

type ProductFilteringAttributes = {
  master?: boolean;
  attributes?: Record<string, string>;
};

// TODO: Add interfaces for some of the methods in core
// Product

export const getProductName = (product: Product): string => (product && product.name) || '';

export const getProductSlug = (product: Product): string => {
  if (product && product.name) {
    return product.name.toLowerCase().replace(/\s+/g, '-');
  }

  return '';
};

export const getProductPrice = (product: Product): AgnosticPrice => {
  if (!product) {
    return {
      regular: 0
    };
  }

  if (product.price.original) {
    return {
      regular: product.price.original,
      special: product.price.current
    };
  }

  return {
    regular: product.price.current
  };
};

export const getProductGallery = (product: Product): AgnosticMediaGalleryItem[] => {
  if (!product) {
    return [];
  }

  return product.images.map((image) => ({
    small: `${image}?sw=560&sh=747`,
    normal: `${image}?sw=560&sh=747`,
    big: `${image}?sw=560&sh=747`
  }));
};

export const getProductCoverImage = (product: Product): string => {
  const coverImage = getProductGallery(product)[0];

  if (coverImage) {
    return coverImage.big;
  }

  return '';
};

const isVariantSelected = (variant: Variant, filters: ProductFilteringAttributes): boolean => Object.entries(variant.variationValues).every(([key, value]) => filters[key] === value);

const getSelectedVariant = (product: Product, filters: ProductFilteringAttributes): Variant | null => product.variants && product.variants.find((variant) => isVariantSelected(variant, filters));

export const getProductFiltered = (products: Product[], filters: ProductFilteringAttributes = {}): Product[] => {
  if (filters.attributes) {
    return products.map((product) => {
      if (product.variants) {
        const selectedVariant = getSelectedVariant(product, filters.attributes);

        if (selectedVariant) {
          return {
            ...product,
            _id: selectedVariant.productId,
            variationValues: selectedVariant.variationValues
          };
        }
      }

      product.variationValues = { ...product.variationValues, ...filters.attributes };

      return product;
    });
  }

  return products;
};

const mapFilterValueToAgnosticAttr = (value: VariationAttributeValue): AgnosticAttribute & { toString: () => string } => ({
  name: value.name,
  label: value.name,
  value: value.value,
  // Necessary because the Filter component pushes the full color object on the QS
  toString() {
    return this.value;
  }
});

export const getProductAttributes = (products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  if (!Array.isArray(products)) {
    return Object.entries(products.variationValues || {})
      .filter(([key]) => !filterByAttributeName || !filterByAttributeName.length || filterByAttributeName.includes(key))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }

  return products.reduce((acc, product) => {
    (product.attributes || [])
      .filter((attr) => !filterByAttributeName || !filterByAttributeName.length || filterByAttributeName.includes(attr.id))
      .map((attr) => ({
        id: attr.id,
        values: attr.values.map(mapFilterValueToAgnosticAttr)
      })).forEach((mappedAttr) => {
        if (!acc[mappedAttr.id]) {
          acc[mappedAttr.id] = mappedAttr.values;
        } else {
          acc[mappedAttr.id] = acc[mappedAttr.id].concat(mappedAttr.values);
        }
      });

    return acc;
  }, {});
};

export const getProductDescription = (product: Product): any => (product && product._description) || '';

export const getProductCategoryIds = (product: Product): string[] => (product && product._categoriesRef) || [];

export const getProductId = (product: Product): string => (product && product._id) || '';

export const getFormattedPrice = (price: number): string => price && String(price);

export const getProductTotalReviews = (): number => 0;

export const getProductAverageRating = (): number => 0;

export const getProductBreadcrumbs = (product: Product): AgnosticBreadcrumb[] => {
  if (!product) {
    return [];
  }

  return [];
};

const productGetters: ProductGetters<Product, ProductFilteringAttributes> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice: getFormattedPrice,
  getTotalReviews: getProductTotalReviews,
  getAverageRating: getProductAverageRating,
  getBreadcrumbs: getProductBreadcrumbs
};

export default productGetters;
