import { Cart, SfccIntegrationContext } from '../../../types';

export default async function removeCouponFromCart(context: SfccIntegrationContext, cartId: string, couponItemId: string): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.removeCouponFromCart) {
    return context.config.overrides.removeCouponFromCart(context, cartId, couponItemId);
  }

  return await context.client.CartsApi.removeCouponFromCart(context, cartId, couponItemId);
}
