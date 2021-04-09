import { AgnosticSavedAddress } from '../types';
import { getAgnosticAddress, getApiAddress } from '../mapping';
import { Context, CustomerAddress } from '@vue-storefront/sfcc-api';
import { useUserShippingFactory, UseUserShippingFactoryParams } from '@vue-storefront/core';

const sortDefaultAtTop = (a: AgnosticSavedAddress, b: AgnosticSavedAddress) => {
  if (a.isDefault) {
    return -1;
  } else if (b.isDefault) {
    return 1;
  }
  return 0;
};

const params: UseUserShippingFactoryParams<AgnosticSavedAddress[], AgnosticSavedAddress> = {
  addAddress: async (context: Context, { address, shipping }) => {
    const newAddress = await context.$sfcc.api.createCustomerAddress(
      getApiAddress(address) as CustomerAddress
    );

    if (newAddress.preferred) {
      return [
        getAgnosticAddress(newAddress),
        ...shipping.map((existingAddress) => ({
          ...existingAddress,
          isDefault: false,
        }))
      ];
    }

    return [
      ...shipping,
      getAgnosticAddress(newAddress)
    ];
  },

  deleteAddress: async (context: Context, { address, shipping }) => {
    await context.$sfcc.api.deleteCustomerAddress(
      getApiAddress(address) as CustomerAddress
    );

    const remainingAddresses = shipping.filter(
      (existingAddress) => existingAddress.id !== address.id
    );

    if (address.isDefault) {
      remainingAddresses[0].isDefault = true;
    }

    return remainingAddresses;
  },

  updateAddress: async (context: Context, { address, shipping }) => {
    await context.$sfcc.api.updateCustomerAddress(
      getApiAddress(address) as CustomerAddress
    );

    return shipping.map((existingAddress) => {
      if (existingAddress.id === address.id) {
        return address;
      }

      if (existingAddress.isDefault) {
        return { ...existingAddress, isDefault: false };
      }

      return existingAddress;
    }).sort(sortDefaultAtTop);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => (await context.$sfcc.api.getCustomerAddresses()).map(getAgnosticAddress),

  setDefaultAddress: async (context: Context, { address, shipping }) => {
    if (!address.isDefault) {
      const updatedAddress = { ...address, isDefault: true };

      await context.$sfcc.api.updateCustomerAddress(
        getApiAddress(updatedAddress) as CustomerAddress
      );

      return [
        updatedAddress,
        ...shipping.slice(1).map((existingAddress) => ({ ...existingAddress, isDefault: false}))
      ];
    }

    return shipping.slice();
  }
};

export default useUserShippingFactory<AgnosticSavedAddress[], AgnosticSavedAddress>(params);
