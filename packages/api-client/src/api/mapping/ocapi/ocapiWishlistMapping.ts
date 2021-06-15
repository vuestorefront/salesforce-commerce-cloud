import { Customer } from 'commerce-sdk';
import { CustomerProductList } from 'commercecloud-ocapi-client';

import { SfccIntegrationContext, Wishlist } from '../../../types';
import { baseMapping } from './ocapiBaseMapping';
import { mapWishlist } from '../shared/wishlistMapping';

export const mapOcapiWishlist = async (context: SfccIntegrationContext, wishlist: CustomerProductList): Promise<Wishlist> => {
  return await mapWishlist(context, baseMapping<Customer.ShopperCustomers.CustomerProductList>(wishlist));
};
