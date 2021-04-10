import { Cart, OrderAddress, SfccIntegrationContext } from '../../../types';

export default async function saveShippingAddress(
  context: SfccIntegrationContext,
  cartId: string,
  shippingAddress: OrderAddress,
  shipmentId?: string
): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.saveShippingAddress) {
    return context.config.overrides.saveShippingAddress(context, cartId, shippingAddress, shipmentId);
  }

  if (cartId) {
    return await context.client.CartsApi.setShippingAddress(context, cartId, shipmentId || 'me', shippingAddress);
  }

  return null;
}
