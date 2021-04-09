# `useUserShipping`

## Features

`useUserShipping` composable can be used to:

* fetch existing saved addresses,
* submit new saved addresses,
* modify and delete existing saved addresses.

## API

- `load` - function for fetching customer addresses. When invoked, it requests data from the API and populates `shipping` property.

- `addAddress` - function for posting new shipping address. This method accepts a single `params` object. The `params` has the following options:

    - `address: ShippingAddressAddParams`

```typescript
interface ShippingAddressAddParams {
  address: {
    firstName: string;
    lastName: string;
    streetName: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    apartment: string;
    phone: string;
    isDefault?: boolean;
  }
}
```

- `deleteAddress` - function for deleting existing shipping address. This method accepts a single `params` object. The `params` has the following options:

    - `address: ShippingAddressDeleteParams`

```typescript
interface ShippingAddressDeleteParams {
  address: {
    id: string;
  }
}
```

- `updateAddress` - function for updating existing shipping address. This method accepts a single `params` object. The `params` has the following options:

    - `address: ShippingAddressUpdateParams`

```typescript
interface ShippingAddressUpdateParams {
  address: {
    id: string;
    firstName: string;
    lastName: string;
    streetName: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    apartment: string;
    phone: string;
    isDefault?: boolean;
  }
}
```

- `setDefaultAddress` - function for settings an existing shipping address as default. This method accepts a single `params` object. The `params` has the following options:

    - `address: ShippingAddressSetDefaultParams`

```typescript
interface ShippingAddressSetDefaultParams {
  address: {
    id: string;
  }
}
```

- `shipping: AgnosticSavedAddress[]` - reactive data object containing response from the backend.

```ts
export type AgnosticSavedAddress = {
  id?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  isDefault?: boolean;
};
```

- `loading: boolean` - reactive object containing information about loading state of `load`, `addAddress`, `deleteAddress`, `updateAddress` and `setDefaultAddress` methods.

- `error: UseUserShippingErrors` - reactive object containing the error message, if some properties failed for any reason.

```ts
interface UseUserShippingErrors {
  addAddress: Error;
  deleteAddress: Error;
  updateAddress: Error;
  load: Error;
  setDefaultAddress: Error;
}
```

## Getters

- `getAddresses` - returns list of shipping addresses.

- `getDefault` - returns a default shipping address.

- `getTotal` - returns total number of shipping addresses user has.

- `getId` - returns id from an individual address.

- `getPostCode` - returns post code from an individual address.

- `getStreetName` - returns street name from an individual address.

- `getStreetNumber` - returns street number from an individual address.

- `getCity` - returns city name from an individual address.

- `getFirstName` - returns first name from an individual address.

- `getLastName` - returns last name from an individual address.

- `getCountry` - returns country name from an individual address.

- `getPhone` - return phone number from an individual address.

- `getEmail` - returns e-mail address from an individual address.

- `getProvince` - returns province (state) from an individual address.

- `getCompanyName` - returns company name from an individual address.

- `getTaxNumber` - returns tax number from an individual address.

- `getApartmentNumber` - returns apartment number from an individual address.

- `isDefault` - return information if address is current default.

```typescript
interface UserShippingGetters {
  getAddresses: (shipping: User, criteria?: Record<string, any>) => AgnosticSavedAddress[];
  getDefault: (shipping: User) => AgnosticSavedAddress;
  getTotal: (shipping: User) => number;
  getId: (address: AgnosticSavedAddress) => string | number;
  getPostCode: (address: AgnosticSavedAddress) => string;
  getStreetName: (address: AgnosticSavedAddress) => string;
  getStreetNumber: (address: AgnosticSavedAddress) => string | number;
  getCity: (address: AgnosticSavedAddress) => string;
  getFirstName: (address: AgnosticSavedAddress) => string;
  getLastName: (address: AgnosticSavedAddress) => string;
  getCountry: (address: AgnosticSavedAddress) => string;
  getPhone: (address: AgnosticSavedAddress) => string;
  getEmail: (address: AgnosticSavedAddress) => string;
  getProvince: (address: AgnosticSavedAddress) => string;
  getCompanyName: (address: AgnosticSavedAddress) => string;
  getTaxNumber: (address: AgnosticSavedAddress) => string;
  getApartmentNumber: (address: AgnosticSavedAddress) => string | number;
  isDefault: (address: AgnosticSavedAddress) => boolean;
}
```

## Example

```typescript
import { onSSR } from '@vue-storefront/core';
import { useUserShipping, userShippingGetters } from '@vsf-enterprise/sfcc';

export default {
  setup() {
    const {
      shipping,
      load,
      addAddress,
      deleteAddress,
      updateAddress
    } = useUserShipping();

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await load();
    });

    return {
      shipping: computed(() => userShippingGetters.getAddresses(shipping.value)),
      userShippingGetters
    };
  }
};
```
