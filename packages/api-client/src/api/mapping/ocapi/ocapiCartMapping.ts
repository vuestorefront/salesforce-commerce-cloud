import {
  Basket,
  ShippingMethod,
  PaymentMethod,
  OrderAddress
} from 'commercecloud-ocapi-client';

import {
  Cart,
  ShippingMethod as ApiShippingMethod,
  PaymentMethod as ApiPaymentMethod,
  OrderAddress as ApiOrderAddress,
  SfccIntegrationContext
} from '../../../types';

import { mapCart } from '../shared/cartMapping';
import { baseMapping } from './ocapiBaseMapping';

export const mapOcapiCart = async (
  context: SfccIntegrationContext,
  cart: Basket
): Promise<Cart> => mapCart(context, baseMapping<Cart>(cart));

export const mapOcapiPaymentMethod = (method: ApiPaymentMethod): PaymentMethod => baseMapping<PaymentMethod>(method);

export const mapOcapiShippingMethod = (method: ApiShippingMethod): ShippingMethod => baseMapping<ShippingMethod>(method);

export const mapOcapiAddress = (address: OrderAddress): ApiOrderAddress => baseMapping<ApiOrderAddress>(address);

export const mapToOcapiAddress = (address: ApiOrderAddress): OrderAddress => ({
  title: address.title,
  salutation: address.salutation,
  suffix: address.suffix,
  first_name: address.firstName, // eslint-disable-line camelcase
  second_name: address.secondName, // eslint-disable-line camelcase
  last_name: address.lastName, // eslint-disable-line camelcase
  job_title: address.jobTitle, // eslint-disable-line camelcase
  company_name: address.companyName, // eslint-disable-line camelcase
  full_name: address.firstName + ' ' + address.lastName, // eslint-disable-line camelcase
  address1: address.address1,
  address2: address.address2,
  suite: address.suite,
  city: address.city,
  post_box: address.postBox, // eslint-disable-line camelcase
  postal_code: address.postalCode, // eslint-disable-line camelcase
  state_code: address.stateCode, // eslint-disable-line camelcase
  country_code: address.countryCode, // eslint-disable-line camelcase
  phone: address.phone
});
