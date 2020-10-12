import { Customer } from 'commerce-sdk';
import { PostCustomersAuthResult } from 'commercecloud-ocapi-client';

export const getTokenFromCustomerAuthResponse = (result: PostCustomersAuthResult | Customer.ShopperCustomers.Customer): string | null =>
  result.response.header.authorization && result.response.header.authorization.replace('Bearer ', '');
