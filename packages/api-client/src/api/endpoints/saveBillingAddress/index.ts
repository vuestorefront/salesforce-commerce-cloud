import { Cart, OrderAddress, SfccIntegrationContext } from '../../../types';

export default async function saveBillingAddress(
  context: SfccIntegrationContext,
  cartId: string,
  billingAddress: OrderAddress
): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.saveBillingAddress) {
    return context.config.overrides.saveBillingAddress(context, cartId, billingAddress);
  }

  if (cartId) {
    return await context.client.CartsApi.setBillingAddress(context, cartId, billingAddress);
  }

  return null;
}
