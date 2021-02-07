import { Cart, SfccIntegrationContext } from '../../../types';

export default async function resetCart(context: SfccIntegrationContext, cartId: string): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.resetCart) {
    return context.config.overrides.resetCart(context, cartId);
  }

  return await context.client.CartsApi.resetCart(context, cartId);
}
