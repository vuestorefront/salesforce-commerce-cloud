import { Cart, SfccIntegrationContext } from '../../../types';

export default async function savePaymentInstrument(
  context: SfccIntegrationContext,
  cartId: string,
  paymentMethodId: string,
  amount: number,
  body: any
): Promise<Cart> {
  if (context.config.overrides && context.config.overrides.savePaymentInstrument) {
    return context.config.overrides.savePaymentInstrument(context, cartId, paymentMethodId, amount, body);
  }

  if (cartId) {
    return await context.client.CartsApi.addPayment(context, cartId, paymentMethodId, amount, body);
  }

  return null;
}
