/* istanbul ignore file */

import {
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { Context, Order, OrderSearchParams } from '@vue-storefront/sfcc-api';

const params: UseUserOrderFactoryParams<Order[], OrderSearchParams> = {
  searchOrders: async (context: Context, params?: OrderSearchParams): Promise<Order[]> => {
    return await context.$sfcc.api.getCustomerOrders(params || {});
  }
};

export default useUserOrderFactory<Order[], OrderSearchParams>(params);
