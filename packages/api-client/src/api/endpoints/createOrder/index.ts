import { Order, SfccIntegrationContext } from '../../../types';

export default async function createOrder(context: SfccIntegrationContext, cartId: string): Promise<Order> {
  if (context.config.overrides && context.config.overrides.createOrder) {
    return context.config.overrides.createOrder(context, cartId);
  }

  if (cartId) {
    const order = await context.client.OrdersApi.createOrder(context, cartId);

    if (order) {
      return await context.client.OrdersApi.authorizePayments(context, order);
    }
  }

  return null;
}
