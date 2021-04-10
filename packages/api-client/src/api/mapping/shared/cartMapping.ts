import { Checkout } from 'commerce-sdk';

import { mapLineItems } from './lineItemMapping';
import { Cart, SfccIntegrationContext } from '../../../types';

export const mapCart = async (context: SfccIntegrationContext, cart: Checkout.ShopperBaskets.Basket): Promise<Cart> => {
  if (cart.productItems) {
    cart.lineItems = await mapLineItems(context, cart.productItems);
  }

  return cart;
};
