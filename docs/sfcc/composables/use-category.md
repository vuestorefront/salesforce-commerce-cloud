# `useCategory`

## Features

`useCategory` composable is responsible for fetching a list of categories. A common usage scenario for this composable is navigation.

## API

- `search` - a main querying function that is used to query categories from eCommerce platform and populate the `categories` object with the result. Every time you invoke this function API request is made. This method accepts a single `params` object. The `params` has the following options:

    - `slug: string`
    - `target: 'menu'`

```ts
export type CategorySearchParams = {
  slug: string;
  target?: 'menu';
};
```

- `categories: Category[]` - a main data object that contains an array of categories fetched by `search` method.

```ts
type Category = {
  categories?: Array<Category>;
  description?: string;
  id: string;
  image?: string;
  name?: string;
  pageDescription?: string;
  pageKeywords?: string;
  pageTitle?: string;
  parentCategoryId?: string;
  thumbnail?: string;
}
```

- `loading: boolean` - a reactive object containing information about loading state of your `search` method.

- `error: UseCategoryErrors` - reactive object containing the error message, if `search` failed for any reason.

```ts
interface UseCategoryErrors {
  search: Error;
}
```

## Getters

- `getTree` - returns category tree.

```ts
interface CategoryGetters {
  getTree: (category: Category) => AgnosticCategoryTree | null;
}

interface AgnosticCategoryTree {
  label: string;
  slug?: string;
  items: AgnosticCategoryTree[];
  isCurrent: boolean;
  count?: number;
  [x: string]: unknown;
}
```

## Example

```js
import { useCategory } from '@vue-storefront/sfcc';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { categories, search, loading } = useCategory('menu-categories');

    onSSR(async () => {
      await search({});
    });

    return {
      categories,
      loading
    }
  }
}
```
