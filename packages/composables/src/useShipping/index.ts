import useCart, { UseCartComposable } from '../useCart';
import { useShippingFactory, UseShippingParams } from '@vue-storefront/core';
import { Context } from '@vue-storefront/sfcc-api';
import { AgnosticAddress } from '../types';
import { getApiAddress, getAgnosticAddress } from '../mapping';

type ProviderContext = Context & {
  cart: UseCartComposable;
};

const params: UseShippingParams<AgnosticAddress, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: ProviderContext) => {
    if (!context.cart.cart.value) {
      await context.cart.load();
    }

    return getAgnosticAddress(context.cart.cart.value.shipments[0].shippingAddress || {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: ProviderContext, { shippingDetails }) => {
    if (!context.cart.cart.value) {
      await context.cart.load();
    }

    const cart = await context.$sfcc.api.saveShippingAddress(
      context.cart.cart.value.basketId,
      getApiAddress(shippingDetails)
    );

    context.cart.setCart(cart);

    return shippingDetails;
  }
};

export default useShippingFactory<AgnosticAddress, any>(params);
