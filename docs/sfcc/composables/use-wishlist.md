# `useWishlist`

## Features

`useWishlist` composable is responsible, for integrating with wishlists from SFCC, using the current customer's first product list. It allows to:

- fetch products from wishlist
- add products to wishlist
- remove products from wishlist
- check if product is on wishlist

## API

- `wishlist: Wishlist` - a main data object.

```ts
type CustomerProductList = {
  coRegistrant?: CustomerCustomerProductListRegistrant;
  creationDate?: any;
  currentShippingAddressInfo?: CustomerAddressInfo;
  customerCustomerProductListItems?: Array<CustomerCustomerProductListItem>;
  description?: string;
  event?: CustomerProductListEvent;
  id?: string;
  lastModified?: any;
  name?: string;
  postEventShippingAddressInfo?: CustomerAddressInfo;
  productListShippingAddress?: CustomerProductListShippingAddress;
  public?: boolean;
  registrant?: CustomerCustomerProductListRegistrant;
  shippingAddressInfo?: CustomerAddressInfo;
  type?: string;
}

type CustomerProductListItem = {
  id?: string;
  priority: number;
  product?: Product;
  productId?: string;
  public: boolean;
  purchasedQuantity?: number;
  quantity: number;
  type?: string;
}

type Wishlist = CustomerProductList & {
  items: WishlistItem[];
};

type WishlistItem = CustomerProductListItem & {
  fullProduct: Product;
};
```

- `load` - function used to retrieve wishlist products. When invoked, it requests data from the API and populates `wishlist` property.

- `addItem` - function used to add new product to wishlist. When invoked, it submits data to the API and populates `wishlist` property with updated information. This method accepts a single `params` object. The `params` has the following options:

    - `product: Product`


- `removeItem` - function that removes products from the wishlist. It submits data to the API and populates updated `wishlist` property. This method accepts a single `params` object. The `params` has the following options:

  - `product: WishlistItem`


- `clear` - function that removes all products from the wishlist and populates clear `wishlist` property.

- `isInWishlist` - function that checks if product is on the wishlist. It returns boolean value. This method accepts a single `params` object. The `params` has the following option:

  - `product: ProductVariant`


- `loading: boolean` - a reactive object containing information about loading state of the cart.

- `error: UseWishlistErrors` - reactive object containing the error message, if some properties failed for any reason.

```ts
interface UseWishlistErrors {
  addItem: Error;
  removeItem: Error;
  load: Error;
  clear: Error;
}
```

## Getters

- `getItems` - returns list of products on wishlist

- `getItemName` - returns product's name from wishlist.

- `getItemImage` - returns product's image from wishlist.

- `getItemPrice` - returns product's price from wishlist.

- `getItemQty` - returns quantity of product which is on wishlist.

- `getItemAttributes` - returns product variant attribute chosen by its name.

- `getItemSku` - returns product's SKU code.

- `getTotals` - returns price of products.

- `getTotalItems` - returns amount of all items that are currently on wishlist.

- `getFormattedPrice` - returns price in formatted manner taking into account local specifics.

```typescript
interface WishlistGetters {
  getTotals: (wishlist: Wishlist) => AgnosticTotals;
  getItems: (wishlist: Wishlist) => ShoppingListLineItem[];
  getItemName: (product: ShoppingListLineItem) => string;
  getItemImage: (product: ShoppingListLineItem) => string;
  getItemPrice: (product: ShoppingListLineItem) => AgnosticPrice;
  getItemQty: (product: ShoppingListLineItem) => number;
  getItemAttributes: (product: ShoppingListLineItem, filterByAttributeName?: string[]) => ({});
  getItemSku: (product: ShoppingListLineItem) => string;
  getTotalItems: (wishlist: Wishlist) => number;
  getFormattedPrice: (price: number) => string;
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
```

## Example

```typescript
import { onSSR } from '@vue-storefront/core';
import { useWishlist, wishlistGetters } from '@vsf-enterprise/sfcc';

export default {
  setup() {
    const { load: loadWishlist } = useWishlist();

    const wishlistItems = computed(() => wishlistGetters.getItems());

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await loadWishlist();
    });

    return {
      loadWishlist,
      wishlistItems
    };
  }
};
```
