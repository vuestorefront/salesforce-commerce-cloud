import { SfccIntegrationContext, Wishlist } from '../../../types';

export default async function removeFromWishlist(context: SfccIntegrationContext, listId: string, itemId: string): Promise<Wishlist> {
  if (context.config.overrides && context.config.overrides.removeFromWishlist) {
    return context.config.overrides.removeFromWishlist(context, listId, itemId);
  }

  return context.client.WishlistsApi.removeFromWishlist(listId, itemId);
}
