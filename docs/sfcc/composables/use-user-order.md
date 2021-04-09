# `useUserOrder`

## Features

`useUserOrder` composable is responsible, as its name suggests for interactions with user's order history from your eCommerce.

## API

- `searchOrders` - a main querying function that is used to query user's order history from eCommerce platform and populate the `orders` object with the result. This method accepts a single params object.

```ts
type OrderSearchParams = {
  crossSites?: boolean;
  from?: string;
  until?: string;
  status?: string;
  offset?: number;
  limit?: number;
}
```

- `orders: Order[]` -  a main data object that contains an array of orders fetched by `searchOrders` method.

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
```

- `loading: boolean` - a reactive object containing information about loading state of your `searchOrders` method.

- `error: UseUserOrderErrors` - reactive object containing the error message, if some properties failed for any reason.

```ts
interface UseUserOrderErrors {
  search: Error;
}
```

## Getters

- `getDate` - returns order date.

- `getId` - returns order Id.

- `getStatus` - returns order status.

- `getPrice` - returns order price.

- `getItems` - returns order items.

- `getItemSku` - returns order item sku.

- `getItemName` - returns order item name.

- `getItemQty` - returns order item quantity.

- `getItemPrice` - returns order item price.

- `getFormattedPrice` - returns order price with currency sign.

```ts
interface UserOrderGetters {
  getDate: (order: Order) => string;
  getId: (order: Order) => string;
  getStatus: (order: Order) => AgnosticOrderStatus;
  getPrice: (order: Order) => number;
  getItems: (order: Order) => LineItem[];
  getItemSku: (item: LineItem) => string;
  getItemName: (item: LineItem) => string;
  getItemQty: (item: LineItem) => number;
  getItemPrice: (item: LineItem) => number;
  getFormattedPrice: (price: number) => string;
}

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

enum AgnosticOrderStatus {
  Open = 'Open',
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Shipped = 'Shipped',
  Complete = 'Complete',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded'
}

type LineItem = {
  adjustedTax?: number;
  basePrice?: number;
  bonusDiscountLineItemId?: string;
  bonusProductLineItem?: boolean;
  bundledProductItems?: Array<ProductItem>;
  gift?: boolean;
  giftMessage?: string;
  inventoryId?: string;
  itemId?: string;
  itemText?: string;
  optionItems?: Array<OptionItem>;
  price?: number;
  priceAdjustments?: Array<PriceAdjustment>;
  priceAfterItemDiscount?: number;
  priceAfterOrderDiscount?: number;
  productId?: string;
  productListItem?: ProductListItemReference;
  productName?: string;
  quantity?: number;
  shipmentId?: string;
  shippingItemId?: string;
  tax?: number;
  taxBasis?: number;
  taxClassId?: string;
  taxRate?: number;
}
```

## Example

```js
import { useUserOrder, orderGetters } from '@vue-storefront/sfcc';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const { orders, search, loading, error } = useUserOrder();

    onSSR(async () => {
      await search();
    });

    return {
      // extract a list of orders from a `orders` object
      orders: computed(() => orderGetters.getItems(shipping.value)),
    };
  }
};
```
