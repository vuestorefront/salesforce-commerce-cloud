import { Cart, LineItem, SfccIntegrationContext } from '../../../types';

export default async function updateCartItem(context: SfccIntegrationContext, cartId: string, item: LineItem, quantity: number): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.updateCartItem) {
    return context.config.overrides.updateCartItem(context, cartId, item, quantity);
  }

  return await context.client.CartsApi.updateCartItemQuantity(context, cartId, item, quantity);
}
