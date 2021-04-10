import { BasketShippingMethods, SfccIntegrationContext } from '../../../types';

export default async function getApplicableShippingMethods(context: SfccIntegrationContext, cartId: string): Promise<BasketShippingMethods> {
  if (context.config.overrides && context.config.overrides.getApplicableShippingMethods) {
    return context.config.overrides.getApplicableShippingMethods(context, cartId);
  }

  if (cartId) {
    return await context.client.CartsApi.getShippingMethods(cartId, 'me');
  }

  return {
    defaultMethodId: null,
    applicableMethods: []
  };
}
