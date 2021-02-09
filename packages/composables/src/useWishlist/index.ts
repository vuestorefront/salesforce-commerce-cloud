/* istanbul ignore file */
import {
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { Context, Wishlist, WishlistItem, Product } from '@vue-storefront/sfcc-api';

export const wishlist: Ref<Wishlist> = ref(null);

const params: UseWishlistFactoryParams<Wishlist, WishlistItem, Product> = {
  load: async (context: Context) => context.$sfcc.api.getWishlist(),

  addItem: async (context: Context, { currentWishlist, product }) => context.$sfcc.api.addToWishlist(currentWishlist.id, product._id),

  removeItem: async (context: Context, { currentWishlist, product }) => context.$sfcc.api.removeFromWishlist(currentWishlist.id, product.id),

  clear: async (context: Context, { currentWishlist }) => {
    const removals = currentWishlist.items.map((item) => context.$sfcc.api.removeFromWishlist(currentWishlist.id, item.id));

    await Promise.all(removals);

    return {
      ...currentWishlist,
      items: []
    };
  },

  isInWishlist: (_: Context, { currentWishlist, product }) => currentWishlist.items.some((item) => item.productId === product._id)
};

export default useWishlistFactory<Wishlist, WishlistItem, Product>(params);
