import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticAttribute
} from '@vue-storefront/core';
import { getProductPrice, getProductAttributes } from './productGetters';
import { Wishlist, WishlistItem } from '@vue-storefront/sfcc-api';

export const getWishlistItems = (wishlist: Wishlist): WishlistItem[] => {
  if (!wishlist) {
    return [];
  }

  return wishlist.items;
};

export const getWishlistItemName = (item: WishlistItem): string => (item && item.fullProduct && item.fullProduct.name) || '';

export const getWishlistItemImage = (item: WishlistItem): string => (item && item.fullProduct && item.fullProduct.images[0]) || '';

export const getWishlistItemPrice = (item: WishlistItem): AgnosticPrice => getProductPrice(item.fullProduct);

export const getWishlistItemQty = (item: WishlistItem): number => item ? (item.quantity || 1) : 0;

export const getWishlistItemAttributes = (
  item: WishlistItem,
  filterByAttributeName?: string[]
): Record<string, AgnosticAttribute | string> => (item && item.fullProduct && getProductAttributes(item.fullProduct, filterByAttributeName)) || {};

export const getWishlistItemSku = (item: WishlistItem): string => (item && item.productId) || '';

export const getWishlistTotals = (wishlist: Wishlist): AgnosticTotals => {
  if (!wishlist || !wishlist.items) {
    return {
      total: 0,
      subtotal: 0
    };
  }

  const total = wishlist.items.reduce((total, item) => {
    const price = getWishlistItemPrice(item);

    return total + (price.special || price.regular);
  }, 0);

  return {
    total,
    subtotal: total
  };
};

export const getWishlistShippingPrice = (): number => 0;

export const getWishlistTotalItems = (wishlist: Wishlist): number => {
  if (!wishlist || !wishlist.items) {
    return 0;
  }

  return wishlist.items.length;
};

export const getFormattedPrice = (price: number): string => price && String(price);

const wishlistGetters: WishlistGetters<Wishlist, WishlistItem> = {
  getTotals: getWishlistTotals,
  getShippingPrice: getWishlistShippingPrice,
  getItems: getWishlistItems,
  getItemName: getWishlistItemName,
  getItemImage: getWishlistItemImage,
  getItemPrice: getWishlistItemPrice,
  getItemQty: getWishlistItemQty,
  getItemAttributes: getWishlistItemAttributes,
  getItemSku: getWishlistItemSku,
  getTotalItems: getWishlistTotalItems,
  getFormattedPrice
};

export default wishlistGetters;
