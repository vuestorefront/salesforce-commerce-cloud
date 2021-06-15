import { Customer } from 'commerce-sdk';

import { getProducts } from '../../endpoints/getProduct';
import { SfccIntegrationContext, Product, Wishlist, WishlistItem } from '../../../types';

const mapWishlistItem = async (context: SfccIntegrationContext, item: Customer.ShopperCustomers.CustomerProductListItem, productsMap?: Record<string, Product>): Promise<WishlistItem> => {
  const product = (productsMap && productsMap[item.product_id]) || (await getProducts(context, [item.productId]))[0];

  return {
    ...item,
    fullProduct: product
  };
};

export const mapWishlist = async (context: SfccIntegrationContext, wishlist: Customer.ShopperCustomers.CustomerProductList): Promise<Wishlist> => {
  const items = wishlist.customerProductListItems || [];
  const productIds = items.map((item) => item.productId);
  const products = (productIds.length && await getProducts(context, productIds)) || [];

  const productsMap = products.reduce((map, product) => ({ ...map, [product._id]: product }), {});
  const wishlistItemsBuilds = items.map((item) => mapWishlistItem(context, item, productsMap));

  return {
    ...wishlist,
    items: await Promise.all(wishlistItemsBuilds)
  };
};
