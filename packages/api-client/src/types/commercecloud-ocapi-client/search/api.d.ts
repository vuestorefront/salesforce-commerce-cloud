declare module 'commercecloud-ocapi-client' {
  export type ProductSearchExpandOptions = 'availability'
      | 'images'
      | 'prices'
      | 'represented_products'
      | 'variations';
  export type ProductSearchOptions = {
    q?: string;
    refine?: string[];
    sort?: string;
    start?: number;
    count?: number;
    expand?: ProductSearchExpandOptions[];
    currency?: string;
    locale?: string;
  };
  export type ProductSearchResult = {
    count: number;
    data: unknown;
    fetch_date: number;
    hits: ProductSearchHit[];
    next: string;
    previous: string;
    query: string;
    refinements: ProductSearchRefinement[];
    search_phrase_suggestions: Suggestion[];
    selected_refinements: Record<string, string>;
    selected_sorting_option: string;
    sorting_options: ProductSearchSortingOption[];
    start: number;
    total: number;
  };
  export class ProductSearchApi {
    constructor();
    getProductSearch(opts: ProductSearchOptions): Promise<ProductSearchResult>;
  }
}
