/* istanbul ignore file */

import {
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import { Context, OrderSearchParams, OrderSearchResult } from '@vue-storefront/sfcc-api';

const params: UseUserOrderFactoryParams<OrderSearchResult, OrderSearchParams> = {
  searchOrders: async (context: Context, params?: OrderSearchParams): Promise<OrderSearchResult> => {
    return await context.$sfcc.api.getCustomerOrders(params || {});
  }
};

export default useUserOrderFactory<OrderSearchResult, OrderSearchParams>(params);
