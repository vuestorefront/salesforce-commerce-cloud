# `useProduct`

## Features

`useProduct` composable is responsible for fetching a product or a list of products.

## API

- `search` - a main querying function that is used to query products from eCommerce platform and populate the `products` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object. The `params` has the following options:

    - `searchParams: ProductsSearchParams`

```ts
interface ProductsSearchParams {
  id: string;
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: Record<string, Filter>;
  catId?: string | string[];
  skus?: string[];
  slug?: string;
  id?: string;
}

```
If a product ID is provided, only that product is fetcher (equivalent to reading a product from the database); if a category ID is provided, the equivalent of an index-driven search for products in that category is executed, following the rules of the [useFacet composable](use-facet.md)

- `products: Product[]` - a main data object that contains an array of products fetched by `search` method.

```ts
type ProductVariant = {
  _id: string;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  attributes?: VariationAttribute[];
  variationValues?: {
    [key: string]: string;
  };
  variants?: Variant[];
  price: {
    original: number;
    current: number;
  };
}
```

- `loading: boolean` - a reactive object containing information about loading state of your `search` method.

- `error: UseProductErrors` - reactive object containing the error message, if `search` failed for any reason.

```ts
interface UseProductErrors {
  search: Error;
}
```

## Getters

- `getName` - returns product name.

- `getSlug` - returns product slug.

- `getPrice` - returns product price.

- `getGallery` - returns product gallery.

- `getCoverImage` - returns cover image of product.

- `getFiltered` - returns filtered product.

- `getAttributes` - returns product attributes.

- `getDescription` - returns product description.

- `getCategoryIds` - returns all product categories.

- `getId` - returns product ID.

- `getFormattedPrice` - returns product price with currency sign.

- `getTotalReviews` - returns total number of reviews product has.

- `getAverageRating` - returns average rating from all reviews.

```ts
interface ProductGetters {
  getName: (product: ProductVariant | Readonly<ProductVariant>) => string;
  getSlug: (product: ProductVariant | Readonly<ProductVariant>) => string;
  getPrice: (product: ProductVariant | Readonly<ProductVariant>) => AgnosticPrice;
  getGallery: (product: ProductVariant) => AgnosticMediaGalleryItem[];
  getCoverImage: (product: ProductVariant) => string;
  getFiltered: (products: ProductVariant[], filters: ProductVariantFilters | any = {}) => ProductVariant[];
  getAttributes: (products: ProductVariant[] | ProductVariant, filterByAttributeName?: string[]) => Record<string, AgnosticAttribute | string>;
  getDescription: (product: ProductVariant) => string;
  getCategoryIds: (product: ProductVariant) => string[];
  getId: (product: ProductVariant) => string;
  getFormattedPrice: (price: number) => string;
  getTotalReviews: (product: ProductVariant) => number;
  getAverageRating: (product: ProductVariant) => number;
}

interface AgnosticPrice {
  regular: number | null;
  special?: number | null;
}

interface AgnosticMediaGalleryItem {
  small: string;
  normal: string;
  big: string;
}

interface AgnosticAttribute {
  name?: string;
  value: string | Record<string, any>;
  label: string;
}

interface Product {
  _id: string;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  attributes?: VariationAttribute[];
  variationValues?: {
    [key: string]: string;
  };
  variants?: Variant[];
  price: {
    original: number;
    current: number;
  };
}

interface ProductVariantFilters {
  master?: boolean;
  attributes?: Record<string, string>;
}
```

## Example

```js
import { useProduct, productGetters } from '@vue-storefront/sfcc';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { products, search, loading, error } = useProduct('<UNIQUE_ID>');

    onSSR(async () => {
      await search({ slug: 'super-t-shirt' })
    })

    return {
      loading,
      error,
      product: computed(() => productGetters.getFiltered(products.value, { master: true, attributes: context.root.$route.query })[0]),
      option: computed(() => productGetters.getAttributes(products.value, ['color', 'size'])),
      configuration: computed(() => productGetters.getCategoryIds(product.value))
    }
  }
}
```
