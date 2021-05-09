import { SfccIntegrationContext, Wishlist } from '../../../types';

export default async function getWishlist(context: SfccIntegrationContext): Promise<Wishlist> {
  if (context.config.overrides && context.config.overrides.getWishlist) {
    return context.config.overrides.getWishlist(context);
  }

  let wishlist: Wishlist = null;

  try {
    wishlist = await context.client.WishlistsApi.getWishlist(context);
  } catch (e) {
    // TODO Handle
  }

  if (!wishlist) {
    try {
      wishlist = await context.client.WishlistsApi.createWishlist(context);
    } catch (e) {
      // TODO Handle
    }
  }

  return wishlist;
}
