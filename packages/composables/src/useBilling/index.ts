import useCart, { UseCartComposable } from '../useCart';
import { useBillingFactory, UseBillingParams } from '@vue-storefront/core';
import { Context } from '@vue-storefront/sfcc-api';
import { AgnosticAddress } from '../types';
import { getApiAddress, getAgnosticAddress } from '../mapping';

type ProviderContext = Context & {
  cart: UseCartComposable;
};

const params: UseBillingParams<AgnosticAddress, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: ProviderContext) => {
    if (!context.cart.cart.value) {
      await context.cart.load();
    }

    return getAgnosticAddress(context.cart.cart.value.billingAddress || {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: ProviderContext, { billingDetails }) => {
    if (!context.cart.cart.value) {
      await context.cart.load();
    }

    const cart = await context.$sfcc.api.saveBillingAddress(
      context.cart.cart.value.basketId,
      getApiAddress(billingDetails)
    );

    context.cart.setCart(cart);

    return billingDetails;
  }
};

export default useBillingFactory<AgnosticAddress, any>(params);
