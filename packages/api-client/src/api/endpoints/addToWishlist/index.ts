import { SfccIntegrationContext, Wishlist } from '../../../types';

export default async function addToWishlist(context: SfccIntegrationContext, listId: string, productId: string): Promise<Wishlist> {
  if (context.config.overrides && context.config.overrides.addToWishlist) {
    return context.config.overrides.addToWishlist(context, listId, productId);
  }

  return context.client.WishlistsApi.addToWishlist(listId, productId);
}
