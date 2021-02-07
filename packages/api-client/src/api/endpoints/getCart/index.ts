import { Cart, SfccIntegrationContext } from '../../../types';

export default async function getCart(context: SfccIntegrationContext): Promise<Cart> {
  let cart: Cart = null;

  if (context.config.overrides && context.config.overrides.getCart) {
    return context.config.overrides.getCart(context);
  }

  const token = context.config.jwtToken;

  if (token) {
    try {
      const carts = await context.client.CustomersApi.getCarts(context);

      cart = carts[0];
    } catch (e) {
      // TODO Handle
    }
  }

  if (!cart) {
    try {
      cart = await context.client.CartsApi.createCart(context);
    } catch (e) {
      // TODO Handle
    }
  }

  return cart;
}
