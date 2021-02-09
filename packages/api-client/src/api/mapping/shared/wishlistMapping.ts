import { Customer } from 'commerce-sdk';
import { useVSFContext } from '@vue-storefront/core';

import { getProducts } from '../../endpoints/getProduct';
import { SfccIntegrationContext, Product, Wishlist, WishlistItem } from '../../../types';

const mapWishlistItem = async (context: SfccIntegrationContext, item: Customer.ShopperCustomers.CustomerProductListItem, productsMap?: Record<string, Product>): Promise<WishlistItem> => {
  const product = (productsMap && productsMap[item.product_id]) || (await getProducts(context, [item.productId]))[0];

  return {
    ...item,
    fullProduct: product
  };
};

export const mapWishlist = async (wishlist: Customer.ShopperCustomers.CustomerProductList): Promise<Wishlist> => {
  const context: { $vsf: SfccIntegrationContext } = useVSFContext() as { $vsf: SfccIntegrationContext };

  const items = wishlist.customerProductListItems || [];
  const productIds = items.map((item) => item.productId);
  const products = (productIds.length && await getProducts(context.$vsf.$sfcc, productIds)) || [];

  const productsMap = products.reduce((map, product) => ({ ...map, [product._id]: product }), {});
  const wishlistItemsBuilds = items.map((item) => mapWishlistItem(context.$vsf.$sfcc, item, productsMap));

  return {
    ...wishlist,
    items: await Promise.all(wishlistItemsBuilds)
  };
};
