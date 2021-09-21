import { AgnosticStore, FacetSearchResult } from '@vue-storefront/core';

import {
  ProductSearchRefinement,
  ProductSearchHit,
  ProductHitTypeSearchParam,
  ProductSortingOption,
  ProductSearchParams as ApiProductSearchParams
} from '@vue-storefront/sfcc-api';

export type Address = Record<string, unknown>;

export type Category = Record<string, unknown>;

export type CategorySearchParams = {
  slug: string;
  target?: 'menu';
};

export type UseProductParams = {
  id?: string;
  catId?: string;
  limit?: number;
};

export type ProductSearchParams = ApiProductSearchParams & {
  promoId?: string;
  orderableOnly?: boolean;
  hitType?: ProductHitTypeSearchParam;
  filters: ProductSearchRefinement[];
};

export type FacetResultsData = {
  products: ProductSearchHit[];
  categories: ProductSearchRefinement;
  facets: ProductSearchRefinement[];
  total: number;
  sortOptions: ProductSortingOption[];
  perPageOptions: number[];
  itemsPerPage: number;
};

export type SearchData = FacetSearchResult<FacetResultsData>;

export type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type AgnosticAddress = {
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

export type AgnosticSavedAddress = AgnosticAddress & {
  id: string;
  isDefault: boolean;
};

export type UserAddress = Record<string, unknown>;

export type Cart = Record<string, unknown>;

export type CartItem = Record<string, unknown>;

export type Coupon = Record<string, unknown>;

export type Order = Record<string, unknown>;

export type OrderItem = Record<string, unknown>;

export type Product = Record<string, unknown>;

export type Review = Record<string, unknown>;

export type Shipping = Record<string, unknown>;

export type ShippingMethod = Record<string, unknown>;

export type WishlistItem = Record<string, unknown>;

export type Wishlist = Record<string, unknown>;

export type ProductsResponse = {
  data: Product[];
  total: number;
};

export type OrderSearchParams = Record<string, any>;

export type OrdersResponse = {
  data: any[];
  total: number;
};

export type AgnosticPaymentMethod = {
  label: string;
  value: string;
  description?: string;
};

export type StoresData = {
  stores: AgnosticStore[];
  currentStore: AgnosticStore;
};
