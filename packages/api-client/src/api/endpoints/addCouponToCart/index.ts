import { Cart, SfccIntegrationContext } from '../../../types';

export default async function addCouponToCart(context: SfccIntegrationContext, cartId: string, couponCode: string): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.addCouponToCart) {
    return context.config.overrides.addCouponToCart(context, cartId, couponCode);
  }

  return await context.client.CartsApi.addCouponToCart(context, cartId, couponCode);
}
