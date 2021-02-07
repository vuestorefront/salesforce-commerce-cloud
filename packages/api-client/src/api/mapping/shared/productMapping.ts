import { Product } from 'commerce-sdk';

import {
  Product as ApiProduct,
  VariationAttribute,
  VariationAttributeValue
} from '../../../types';

const mapProductImageGroup = (
  imageGroup: Product.ShopperProducts.ImageGroup
): string[] => imageGroup.images.map((image) => image.disBaseLink);

const mapVariationAttributeValue = (
  selectedValues: Record<string, string>,
  attrId: string,
  attrValue: Product.ShopperProducts.VariationAttributeValue
): VariationAttributeValue => ({
  ...attrValue,
  selected: selectedValues && selectedValues[attrId] === attrValue.value
});

const mapVariationAttribute = (
  selectedValues: Record<string, string>,
  attr: Product.ShopperProducts.VariationAttribute
): VariationAttribute => ({
  ...attr,
  values: attr.values && attr.values.map(mapVariationAttributeValue.bind(null, selectedValues, attr.id))
});

export const mapProduct = (apiProduct: Product.ShopperProducts.Product, viewType?: string): ApiProduct => ({
  _id: apiProduct.id,
  _description: apiProduct.longDescription,
  _categoriesRef: apiProduct.primaryCategoryId ? [apiProduct.primaryCategoryId] : [],
  name: apiProduct.name,
  sku: apiProduct.id,
  images: apiProduct.imageGroups
    .filter((imageGroup) => imageGroup.viewType === viewType)
    .reduce((images, imageGroup) => [...images, ...mapProductImageGroup(imageGroup)], []),
  price: {
    original: apiProduct.priceMax,
    current: apiProduct.price
  },
  variationValues: apiProduct.variationValues,
  variants: apiProduct.variants,
  attributes: apiProduct.variationAttributes && apiProduct.variationAttributes.map(
    mapVariationAttribute.bind(null, apiProduct.variationValues)
  )
});
