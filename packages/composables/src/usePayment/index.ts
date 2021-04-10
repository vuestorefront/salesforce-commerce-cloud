import useCart, { UseCartComposable } from '../useCart';
import { usePaymentFactory, UsePaymentParams } from '../factories';
import { Context, PaymentMethod, PaymentInstrument } from '@vue-storefront/sfcc-api';

type ProviderContext = Context & {
  cart: UseCartComposable;
};

type AddPaymentPayload = {
  paymentMethod: string;
  amount: number;
  params?: Record<string, any>;
};

const params: UsePaymentParams<PaymentMethod, PaymentInstrument, AddPaymentPayload> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: ProviderContext) => {
    if (!context.cart.cart.value) {
      await context.cart.load();
    }

    const paymentMethods = await context.$sfcc.api.getApplicablePaymentMethods(context.cart.cart.value.basketId);
    const paymentInstruments = context.cart.cart.value.paymentInstruments || [];

    return {
      paymentMethods,
      paymentInstruments
    };
  },

  add: async (context: ProviderContext, { paymentMethod, amount, params }: AddPaymentPayload) => {
    if (!context.cart.cart.value) {
      await context.cart.load();
    }

    const cart = await context.$sfcc.api.savePaymentInstrument(
      context.cart.cart.value.basketId,
      paymentMethod,
      amount,
      params
    );

    context.cart.setCart(cart);

    return {
      paymentInstruments: context.cart.cart.value.paymentInstruments || []
    };
  }
};

export default usePaymentFactory<PaymentMethod, PaymentInstrument, AddPaymentPayload>(params);
