import useCart, { UseCartComposable } from '../useCart';
import { Context, Order } from '@vue-storefront/sfcc-api';
import { UseMakeOrder, useMakeOrderFactory } from '@vue-storefront/core';

type ProviderContext = Context & {
  cart: UseCartComposable;
};

const factoryParams = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  make: async (context: ProviderContext): Promise<Order> => {
    if (!context.cart.cart.value) {
      await context.cart.load();
    }

    return await context.$sfcc.api.createOrder(context.cart.cart.value.basketId);
  }
};

const useMakeOrder: () => UseMakeOrder<Order> = useMakeOrderFactory<Order>(factoryParams);

export default useMakeOrder;
