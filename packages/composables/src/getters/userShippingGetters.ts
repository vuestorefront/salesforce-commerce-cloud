import { AgnosticSavedAddress } from '../types';
import { UserShippingGetters } from '@vue-storefront/core';

const userGetters: UserShippingGetters<AgnosticSavedAddress[], AgnosticSavedAddress> = {
  getAddresses: (addresses, criteria?: Record<string, any>) => {
    if (!criteria || !Object.keys(criteria).length) {
      return addresses;
    }
    const entries = Object.entries(criteria);
    return addresses.filter(
      address => entries.every(([key, value]) => address[key] === value)
    );
  },
  getDefault: addresses => addresses.find(address => address.isDefault),
  getTotal: addresses => addresses.length,
  getPostCode: address => address ? address.postalCode : '',
  getStreetName: address => address ? address.streetName : '',
  getStreetNumber: () => '',
  getCity: address => address ? address.city : '',
  getFirstName: address => address ? address.firstName : '',
  getLastName: address => address ? address.lastName : '',
  getCountry: address => address ? address.country : '',
  getPhone: address => address ? address.phone : '',
  getEmail: () => '',
  getProvince: address => address ? address.state : '',
  getCompanyName: () => '',
  getTaxNumber: () => '',
  getId: address => address ? address.id : '',
  getApartmentNumber: address => address ? address.apartment : '',
  isDefault: address => address ? address.isDefault : false
};

export default userGetters;
