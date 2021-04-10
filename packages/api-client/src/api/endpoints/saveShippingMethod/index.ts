import { Cart, SfccIntegrationContext, ShippingMethod } from '../../../types';

export default async function saveShippingMethod(
  context: SfccIntegrationContext,
  cartId: string,
  shippingMethod: ShippingMethod,
  shipmentId?: string
): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.saveShippingMethod) {
    return context.config.overrides.saveShippingMethod(context, cartId, shippingMethod, shipmentId);
  }

  if (cartId) {
    return await context.client.CartsApi.selectShippingMethod(context, cartId, shipmentId || 'me', shippingMethod.id);
  }

  return null;
}
