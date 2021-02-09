import { Customer } from 'commerce-sdk';
import { CustomerProductList } from 'commercecloud-ocapi-client';

import { Wishlist } from '../../../types';
import { baseMapping } from './ocapiBaseMapping';
import { mapWishlist } from '../shared/wishlistMapping';

export const mapOcapiWishlist = async (wishlist: CustomerProductList): Promise<Wishlist> => {
  return await mapWishlist(baseMapping<Customer.ShopperCustomers.CustomerProductList>(wishlist));
};
