# `useShipping`

## Features

`useShipping` composable can be used for:

* Loading shipping address for the current cart.
* Saving shipping address for the current cart.

## API

- `load` - function for fetching shipping address. When invoked, it requests data from the API and populates `shipping` property.

- `save` - function for saving shipping address. This method accepts a single `saveParams` object. The `saveParams` has the following options:

    - `shippingDetails: Address`

```ts
type AgnosticAddress = {
  firstName?: string;
  lastName?: string;
  streetName?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
};
```
- `shipping: AgnosticAddress` - a main data object that contains a shipping address.

- `loading: boolean` - a reactive object containing information about loading state of your `load` or `save` method.

- `error: UseShippingErrors` - a reactive object containing the error message, if `load` or `save` failed for any reason.

```ts
interface UseShippingErrors {
  load?: Error;
  save?: Error;
}
```

## Getters

We do not provide getters for checkout and its parts.

## Example

```js
import { useShipping } from '@vue-storefront/sfcc';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const { load, shipping } = useShipping();

    onSSR(async () => {
      await load();
    });

    return {
      shipping
    };
  }
}
```
