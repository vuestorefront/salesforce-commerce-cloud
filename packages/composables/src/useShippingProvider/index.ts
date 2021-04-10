import useCart, { UseCartComposable } from '../useCart';
import { Context, ShippingMethodResult, ShippingMethod } from '@vue-storefront/sfcc-api';
import { useShippingProviderFactory, UseShippingProviderParams } from '@vue-storefront/core';

type ProviderContext = Context & {
  cart: UseCartComposable;
};

type ShippingState = ShippingMethodResult & {
  selectedShippingMethod: ShippingMethod;
};

const params: UseShippingProviderParams<ShippingState, ShippingMethod> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: ProviderContext): Promise<ShippingState> => {
    if (!context.cart.cart.value) {
      await context.cart.load();
    }

    const methodsResult = await context.$sfcc.api.getApplicableShippingMethods(
      context.cart.cart.value.basketId
    );

    const selectedMethod = context.cart.cart.value.shipments[0].shippingMethod;

    return {
      ...methodsResult,
      selectedShippingMethod: selectedMethod && methodsResult.applicableShippingMethods.find(
        (method) => method.id === selectedMethod.id
      )
    };
  },

  save: async (context: ProviderContext, { shippingMethod, state }): Promise<ShippingState> => {
    if (!context.cart.cart.value) {
      await context.cart.load();
    }

    const cart = await context.$sfcc.api.saveShippingMethod(
      context.cart.cart.value.basketId,
      shippingMethod
    );

    context.cart.setCart(cart);

    return {
      ...state.value,
      selectedShippingMethod: shippingMethod
    };
  }
};

export default useShippingProviderFactory<ShippingState, ShippingMethod>(params);
