import { AgnosticAddress } from "../types";
import { OrderAddress } from "@vue-storefront/sfcc-api";

export const getAgnosticAddress = (apiAddress: OrderAddress): AgnosticAddress => ({
  ...apiAddress,
  streetName: apiAddress.address1,
  apartment: apiAddress.address2,
  country: apiAddress.countryCode,
  state: apiAddress.stateCode
});

export const getApiAddress = (clientAddress: AgnosticAddress): OrderAddress => ({
  ...clientAddress,
  address1: clientAddress.streetName,
  address2: clientAddress.apartment,
  countryCode: clientAddress.country,
  stateCode: clientAddress.state
});
