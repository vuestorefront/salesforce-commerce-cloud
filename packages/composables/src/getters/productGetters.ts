import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { Product } from '@vue-storefront/sfcc-api';

type ProductFilters = any

// TODO: Add interfaces for some of the methods in core
// Product

export const getProductName = (product: Product): string => product.name;

export const getProductSlug = (product: Product): string => {
  if (product.name) {
    return product.name.toLowerCase().replace(/\s+/g, '-');
  }

  return '';
};

export const getProductPrice = (product: Product): AgnosticPrice => {
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
  return product.images.map((image) => ({
    small: `${image}?sw=560&sh=747`,
    normal: `${image}?sw=560&sh=747`,
    big: `${image}?sw=560&sh=747`
  }));
};

export const getProductCoverImage = (product: Product): string => getProductGallery(product)[0].big;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: Product[], filters: ProductFilters | any = {}): Product[] => {
  return [
    {
      _id: '1',
      _description: 'Some description',
      _categoriesRef: [
        '1',
        '2'
      ],
      name: 'Black jacket',
      sku: 'black-jacket',
      images: [
        'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
      ],
      price: {
        original: 12.34,
        current: 10.00
      }
    },
    {
      _id: '2',
      _description: 'Some different description',
      _categoriesRef: [
        '1',
        '2',
        '3'
      ],
      name: 'White shirt',
      sku: 'white-shirt',
      images: [
        'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
      ],
      price: {
        original: 15.11,
        current: 11.00
      }
    }
  ];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return {};
};

export const getProductDescription = (product: Product): any => product._description;

export const getProductCategoryIds = (product: Product): string[] => product._categoriesRef;

export const getProductId = (product: Product): string => product._id;

export const getFormattedPrice = (price: number) => price && String(price);

export const getProductTotalReviews = (): number => 0;

export const getProductAverageRating = (): number => 0;

const productGetters: ProductGetters<Product, ProductFilters> = {
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
  getAverageRating: getProductAverageRating
};

export default productGetters;
