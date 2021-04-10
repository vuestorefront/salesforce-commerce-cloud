import { PaymentMethod, SfccIntegrationContext } from '../../../types';

export default async function getApplicablePaymentMethods(context: SfccIntegrationContext, cartId: string): Promise<PaymentMethod[]> {
  if (context.config.overrides && context.config.overrides.getApplicablePaymentMethods) {
    return context.config.overrides.getApplicablePaymentMethods(context, cartId);
  }

  if (cartId) {
    return (await context.client.CartsApi.getPaymentMethods(cartId)).applicablePaymentMethods;
  }

  return [];
}
