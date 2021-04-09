# `useBilling`

## Features

`useBilling` composable can be used for:

* Loading billing address for the current cart.
* Saving billing address for the current cart.

## API

- `load` - function for fetching billing address. When invoked, it requests data from the API and populates `billing` property.

- `save` - function for saving billing address. This method accepts a single `saveParams` object. The `saveParams` has the following options:

    - `billingDetails: Address`

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
- `billing: AgnosticAddress` - a main data object that contains a billing address.

- `loading: boolean` - a reactive object containing information about loading state of your `load` or `save` method.

- `error: UseBillingErrors` - a reactive object containing the error message, if `load` or `save` failed for any reason.

```ts
interface UseBillingErrors {
  load?: Error;
  save?: Error;
}
```

## Getters

We do not provide getters for checkout and its parts.

## Example

```js
import { useBilling } from '@vue-storefront/sfcc';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const { load, billing } = useBilling();

    onSSR(async () => {
      await load();
    });

    return {
      billing
    };
  }
}
```
