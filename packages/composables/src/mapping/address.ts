import { AgnosticAddress, AgnosticSavedAddress } from "../types";
import { CustomerAddress, OrderAddress } from "@vue-storefront/sfcc-api";

type ApiAddress = CustomerAddress | OrderAddress;

type Address = AgnosticAddress | AgnosticSavedAddress;

type AgnosticAddressType<T extends ApiAddress> =
  T extends CustomerAddress ? AgnosticSavedAddress :
  T extends OrderAddress ? AgnosticAddress :
  never;

type ApiAddressType<T extends Address> =
T extends AgnosticAddress ? OrderAddress :
T extends AgnosticSavedAddress ? CustomerAddress :
  never;

export const getAgnosticAddress = <T extends ApiAddress>(apiAddress: T): AgnosticAddressType<T> => ({
  streetName: apiAddress.address1,
  apartment: apiAddress.address2,
  country: apiAddress.countryCode,
  state: apiAddress.stateCode,
  city: apiAddress.city,
  firstName: apiAddress.firstName,
  lastName: apiAddress.lastName,
  phone: apiAddress.phone,
  postalCode: apiAddress.postalCode,
  id: apiAddress.addressId,
  isDefault: apiAddress.preferred
}) as AgnosticAddressType<T>;

export const getApiAddress = <T extends Address>(clientAddress: T): ApiAddressType<T> => ({
  address1: clientAddress.streetName,
  address2: clientAddress.apartment,
  countryCode: clientAddress.country,
  stateCode: clientAddress.state,
  city: clientAddress.city,
  firstName: clientAddress.firstName,
  lastName: clientAddress.lastName,
  phone: clientAddress.phone,
  postalCode: clientAddress.postalCode,
  addressId: (clientAddress as AgnosticSavedAddress).id,
  preferred: (clientAddress as AgnosticSavedAddress).isDefault
}) as ApiAddressType<T>;
