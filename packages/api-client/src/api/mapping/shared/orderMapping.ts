import { Checkout } from 'commerce-sdk';

import { mapLineItems } from './lineItemMapping';
import { Order, SfccIntegrationContext } from '../../../types';

export const mapOrder = async (context: SfccIntegrationContext, order: Checkout.ShopperOrders.Order): Promise<Order> => {
  if (order.productItems) {
    order.lineItems = await mapLineItems(context, order.productItems);
  }

  return order;
};
