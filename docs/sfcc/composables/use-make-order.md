# `useMakeOrder`

## Features

`useMakeOrder` composable is responsible for making an order

## API

- `make` - function for making an order.
- `order: Order` - a main data object that contains a made order.
```ts
type Order = {
  adjustedMerchandizeTotalTax?: number;
  adjustedShippingTotalTax?: number;
  billingAddress?: OrderAddress;
  bonusDiscountLineItems?: Array<BonusDiscountLineItem>;
  channelType?: string;
  confirmationStatus?: string;
  couponItems?: Array<CouponItem>;
  createdBy?: string;
  creationDate?: any;
  currency?: string;
  customerInfo?: CustomerInfo;
  customerName?: string;
  exportStatus?: string;
  externalOrderStatus?: string;
  giftCertificateItems?: Array<GiftCertificateItem>;
  globalPartyId?: string;
  lastModified?: any;
  merchandizeTotalTax?: number;
  notes?: SimpleLink;
  orderNo?: string;
  orderPriceAdjustments?: Array<PriceAdjustment>;
  orderToken?: string;
  orderTotal?: number;
  paymentInstruments?: Array<OrderPaymentInstrument>;
  paymentStatus?: string;
  productItems?: Array<ProductItem>;
  productSubTotal?: number;
  productTotal?: number;
  shipments?: Array<Shipment>;
  shippingItems?: Array<ShippingItem>;
  shippingStatus?: string;
  shippingTotal?: number;
  shippingTotalTax?: number;
  siteId?: string;
  sourceCode?: string;
  status?: string;
  taxTotal?: number;
  taxation?: string;
}
};
```

- `loading: boolean` - a reactive object containing information about loading state of your `make` method.

- `error: UseMakeOrderErrors` - a reactive object containing the error message, if `load` or `save` failed for any reason.

```ts
interface UseMakeOrderErrors {
  make?: Error;
}
```

## Getters

We do not provide getters for checkout and its parts.

## Example

```js
import { useMakeOrder } from '@vue-storefront/sfcc';
export default {
  setup () {
    const { make, order } = useMakeOrder();
    return {
      make,
      order
    };
  }
}
```
