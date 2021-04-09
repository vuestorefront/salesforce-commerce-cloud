import { Customer, CustomerAddress } from '../../../types';
import { baseMapping } from './ocapiBaseMapping';
import {
  Customer as ApiCustomer,
  CustomerAddress as ApiCustomerAddress
} from 'commercecloud-ocapi-client';

export const mapOcapiCustomer = (customer: ApiCustomer): Customer => baseMapping<Customer>(customer);

export const mapOcapiCustomerAddress = (
  address: ApiCustomerAddress
): CustomerAddress => baseMapping<CustomerAddress>(address);

export const mapToOcapiCustomerAddress = (address: CustomerAddress): ApiCustomerAddress => ({
  address_id: address.addressId, // eslint-disable-line camelcase
  preferred: address.preferred,
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
