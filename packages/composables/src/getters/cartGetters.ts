import { CartGetters, AgnosticPrice, AgnosticTotals, AgnosticCoupon, AgnosticDiscount } from '@vue-storefront/core';
import { Cart, LineItem } from '@vue-storefront/sfcc-api';

export const getCartItems = (cart: Cart): LineItem[] => cart.lineItems;

export const getCartItemName = (product: LineItem): string => product.name;

export const getCartItemImage = (product: LineItem): string => product.images[0];

export const getCartItemPrice = (product: LineItem): AgnosticPrice => {
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

export const getCartItemQty = (product: LineItem): number => product.quantity;

export const getCartItemAttributes = (product: LineItem, filterByAttributeName?: Array<string>): Record<string, string> => {
  if (filterByAttributeName) {
    return Object.entries(product.variationValues || {})
      .filter(([key]) => filterByAttributeName.includes(key))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }

  return product.variationValues || {};
};

export const getCartItemSku = (product: LineItem): string => product.sku;

export const getCartTotals = (cart: Cart): AgnosticTotals => ({
  total: cart.orderTotal,
  subtotal: cart.productSubTotal
});

export const getCartShippingPrice = (cart: Cart): number => cart.shippingTotal;

export const getCartTotalItems = (cart: Cart): number => (cart.lineItems || []).reduce((total, item) => total + item.quantity, 0);

export const getFormattedPrice = (price: number): string | null => price && String(price);

export const getCoupons = (cart: Cart): AgnosticCoupon[] => (cart.orderPriceAdjustments || []).map((adjustment) => ({
  id: adjustment.priceAdjustmentId,
  name: adjustment.itemText,
  code: adjustment.couponCode,
  value: adjustment.appliedDiscount.amount
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDiscounts = (cart: Cart): AgnosticDiscount[] => [];

const cartGetters: CartGetters<Cart, LineItem> = {
  getTotals: getCartTotals,
  getShippingPrice: getCartShippingPrice,
  getItems: getCartItems,
  getItemName: getCartItemName,
  getItemImage: getCartItemImage,
  getItemPrice: getCartItemPrice,
  getItemQty: getCartItemQty,
  getItemAttributes: getCartItemAttributes,
  getItemSku: getCartItemSku,
  getFormattedPrice: getFormattedPrice,
  getTotalItems: getCartTotalItems,
  getCoupons,
  getDiscounts
};

export default cartGetters;
