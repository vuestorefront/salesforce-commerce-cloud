# `useShippingProvider`

## Features

`useShippingProvider` composable can be used for:

* Loading shipping methods for the current cart.
* Selecting shipping method for the current cart.

## API

- `load` - function for fetching shipping method. When invoked, it requests data from the API and populates the `state` property.

- `save` - function for selecting shipping method. This method accepts a single `saveParams` object. The `saveParams` has the following options:

    - `shippingMethod: ShippingMethod`

```ts
type ShippingMethod = {
  description?: string;
  externalShippingMethod?: string;
  id: string;
  name?: string;
  price?: number;
  shippingPromotions?: Array<ShippingPromotion>;
};

type ShippingPromotion = {
  calloutMsg?: string;
  promotionId?: string;
  promotionName?: string;
}
```
- `state: ShippingState` - a main data object that contains the selected shipping method, as well as the currently applicable methods, based on the added products, promotions and addresses, and the ID of the default method
```ts
interface ShippingProviderState {
  applicableShippingMethods?: Array<ShippingMethod>;
  defaultShippingMethodId?: string;
  selectedShippingMethod: ShippingMethod;
}
```

- `loading: boolean` - a reactive object containing information about loading state of your `load` or `save` method.

- `error: UseShippingProviderErrors` - a reactive object containing the error message, if `load` or `save` failed for any reason.

```ts
interface UseShippingProviderErrors {
  load?: Error;
  save?: Error;
}
```

## Getters

We do not provide getters for checkout and its parts.

## Example

```js
import { useShippingProvider } from '@vue-storefront/sfcc';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

export default {
  setup () {
    const { load, state } = useShippingProvider();

    onSSR(async () => {
      await load();
    });

    return {
      selectedShippingMethod: computed(() => state.value && state.value.selectedShippingMethod)
    };
  }
}
```
