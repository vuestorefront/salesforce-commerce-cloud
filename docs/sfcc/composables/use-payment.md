# `usePayment`

## Features

`usePayment` composable can be used for:

* Loading applicable payment methods for the current cart.
* Loading the created payment instruments of the current cart
* Adding the selected payment method for the current cart.

## API

- `load` - function for fetching applicable payment methods. When invoked, it requests data from the API and populates the `paymentMethods` and `paymentInstruments` properties.

```ts
type PaymentMethod = {
  cards?: Array<PaymentCardSpec>;
  description?: string;
  id: string;
  image?: string;
  name?: string;
  paymentProcessorId?: string;
}

type BasketPaymentInstrumentRequest = {
  amount?: number;
  bankRoutingNumber?: string;
  giftCertificateCode?: string;
  paymentCard?: OrderPaymentCardRequest;
  paymentMethodId?: string;
}
```

- `add` - function for adding a payment instrument. This method accepts a single `addParams` object. The `addParams` has the following options:

    - `paymentMethod: string`

    - `amount: number`

    - `params: Record<string, string>`

- `paymentMethods: PaymentMethod[]` - a main data object that contains the currently applicable payment methods.

- `paymentInstruments: PaymentInstrument[]` - a main data object that contains the currently added payment instruments in the current cart.

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
import { cartGetters, useCart, usePayment } from '@vue-storefront/sfcc';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const { add, load, paymentMethods, paymentInstruments } = usePayment();

    const selectMethod = async (method) => {
      await add({
        paymentMethod: method.id,
        amount: cartGetters.getTotals(cart.value).total
      });

      emit('status');
    };

    onSSR(async () => {
      await load();
    });

    return {
      paymentMethods,
      paymentInstruments
    };
  }
}
```
