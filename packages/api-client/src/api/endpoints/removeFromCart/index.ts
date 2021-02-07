import { Cart, LineItem, SfccIntegrationContext } from '../../../types';

export default async function removeFromCart(context: SfccIntegrationContext, cartId: string, item: LineItem): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.removeFromCart) {
    return context.config.overrides.removeFromCart(context, cartId, item);
  }

  return await context.client.CartsApi.removeItemFromCart(context, cartId, item.itemId);
}
