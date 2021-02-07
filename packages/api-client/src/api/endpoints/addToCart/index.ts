import { Cart, Product, SfccIntegrationContext } from '../../../types';

export default async function addToCart(context: SfccIntegrationContext, cartId: string, product: Product, quantity: number): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.addToCart) {
    return context.config.overrides.addToCart(context, cartId, product, quantity);
  }

  return await context.client.CartsApi.addItemToCart(context, cartId, product, quantity);
}
