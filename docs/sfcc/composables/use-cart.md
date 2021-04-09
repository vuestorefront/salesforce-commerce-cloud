# `useCart`

## Features

`useCart` composable can be used to:

* load cart information,
* add, update and remove items in the cart,
* applying and removing coupons,
* checking if product is already added to the cart.

## API

- `cart: Cart` - a main data object.

```ts
type Cart = {
  adjustedMerchandizeTotalTax?: number;
  adjustedShippingTotalTax?: number;
  agentBasket?: boolean;
  basketId?: string;
  billingAddress?: OrderAddress;
  bonusDiscountLineItems?: Array<BonusDiscountLineItem>;
  channelType?: string;
  couponItems?: Array<CouponItem>;
  creationDate?: any;
  currency?: string;
  customerInfo?: CustomerInfo;
  giftCertificateItems?: Array<GiftCertificateItem>;
  inventoryReservationExpiry?: any;
  lastModified?: any;
  merchandizeTotalTax?: number;
  notes?: SimpleLink;
  orderPriceAdjustments?: Array<PriceAdjustment>;
  orderTotal?: number;
  paymentInstruments?: Array<OrderPaymentInstrument>;
  productItems?: Array<ProductItem>;
  productSubTotal?: number;
  productTotal?: number;
  shipments?: Array<Shipment>;
  shippingItems?: Array<ShippingItem>;
  shippingTotal?: number;
  shippingTotalTax?: number;
  sourceCode?: string;
  taxTotal?: number;
  taxation?: string;
}
```  

- `load` - function required to fetch cart from a server or create brand new if it doesn't exist.

- `addItem` - function for adding products to the cart. This method accepts a single `params` object. The `params` has the following options:

    - `product: Product`

    - `quantity: number`

```ts
type Product = {
  _id: string;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  attributes?: VariationAttribute[];
  variationValues?: { [key: string]: string };
  variants?: Variant[];
  price: {
    original: number;
    current: number;
  };
}
```

- `updateItemQty` - function for updating quantity of a product that is already in the cart. This method accepts a single `params` object. The `params` has the following options:

    - `product: LineItem`

    - `quantity: number`

```ts
type LineItem = Product & {
  itemId: string;
  quantity: number;
};
```

- `removeItem` - function for removing a product that currently is in the cart. This method accepts a single `params` object. The `params` has the following options:

    - `product: LineItem`

```ts
type LineItem = Product & {
  itemId: string;
  quantity: number;
};
```

- `isInCart` - function for checking if a product is currently in the cart. This method accepts a single `params` object. The `params` has the following option:

    - `product: Product`

```ts
type Product = {
  _id: string;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  attributes?: VariationAttribute[];
  variationValues?: { [key: string]: string };
  variants?: Variant[];
  price: {
    original: number;
    current: number;
  };
}
```

- `clear` - function for removing all items currently stored in cart.

- `applyCoupon` - function for applying coupon to cart. This method accepts a single `params` object. The `params` has the following options:

    - `couponCode: string`

- `removeCoupon` - function for removing coupon applied to cart. This method accepts a single `params` object. The `params` has the following options:

    - `coupon: CouponItem`

```ts
type CouponItem = {
  code: string;
  couponItemId?: string;
  statusCode?: string;
  valid?: boolean;
};
```

- `loading: boolean` - a reactive object containing information about loading state of the cart.

- `error: UseCartErrors` - reactive object containing the error message, if some properties failed for any reason.

```ts
interface UseCartErrors {
  addItem: Error;
  removeItem: Error;
  updateItemQty: Error;
  load: Error;
  clear: Error;
  applyCoupon: Error;
  removeCoupon: Error;
}
```

## Getters

- `getTotals` - returns cart totals.

- `getShippingPrice` - returns current shipping price.

- `getItems` - returns all items from cart.

- `getItemName` - returns product name.

- `getItemImage` - returns product image.

- `getItemPrice` - returns product price.

- `getItemQty` - returns product quantity.

- `getItemAttributes` - returns product attribute.

- `getItemSku` - returns product SKU.

- `getTotalItems` - returns products amount.

- `getFormattedPrice` - returns product price with currency sign.

- `getCoupons` - returns applied coupons.

- `getDiscounts` - returns all discounts.

```ts
interface CartGetters {
  getTotals: (cart: Cart) => AgnosticTotals;
  getShippingPrice: (cart: Cart) => number;
  getItems: (cart: Cart) => LineItem;
  getItemName: (product: LineItem) => string;
  getItemImage: (product: LineItem) => string;
  getItemPrice: (product: LineItem) => AgnosticPrice;
  getItemQty: (product: LineItem) => number;
  getItemAttributes: (product: LineItem, filterByAttributeName?: Array<string>) => Record<string, AgnosticAttribute | string>;
  getItemSku: (product: LineItem) => string;
  getTotalItems: (cart: Cart) => number;
  getFormattedPrice: (price: number) => string;
  getCoupons: (cart: Cart) => AgnosticCoupon[];
  getDiscounts: (cart: Cart) => AgnosticDiscount[];
}

type LineItem = Product & {
  itemId: string;
  quantity: number;
};

interface AgnosticTotals {
  total: number;
  subtotal: number;
  special?: number;
  [x: string]: unknown;
}

interface AgnosticPrice {
  regular: number | null;
  special?: number | null;
}

interface AgnosticAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}

interface AgnosticCoupon {
  id: string;
  name: string;
  code: string;
  value: number;
}

interface AgnosticDiscount {
  id: string;
  name: string;
  description: string;
  value: number;
  code?: string;
}
```

## Example

```js
import { useCart, cartGetters } from '@vue-storefront/sfcc';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { cart, removeItem, updateItemQty, load } = useCart();

    onSSR(async () => {
      await loadCart();
    })

    return {
      removeItem,
      updateItemQty,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      totalItems: computed(() => cartGetters.getTotalItems(cart.value))
    }
  }
}
```
