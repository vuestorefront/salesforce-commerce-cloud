import { Customer } from '../../../types';
import { baseMapping } from './ocapiBaseMapping';
import { Customer as ApiCustomer } from 'commercecloud-ocapi-client';

export const mapOcapiCustomer = (customer: ApiCustomer): Customer => baseMapping<Customer>(customer);
