import { CheckoutGetters} from '@vue-storefront/core';
import { ShippingMethod } from '@vue-storefront/sfcc-api';

export const getShippingMethodId = (shippingMethod: ShippingMethod): string => shippingMethod && shippingMethod.id;

export const getShippingMethodName = (shippingMethod: ShippingMethod): string => shippingMethod && shippingMethod.name;

export const getShippingMethodDescription = (shippingMethod: ShippingMethod): string => (shippingMethod && shippingMethod.description) || '';

export const getShippingMethodPrice = (shippingMethod: ShippingMethod): number => shippingMethod && shippingMethod.price;

export const getFormattedPrice = (price: number): string => price && String(price);

const checkoutGetters: CheckoutGetters<ShippingMethod> = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getFormattedPrice,
  getShippingMethodPrice
};

export default checkoutGetters;
