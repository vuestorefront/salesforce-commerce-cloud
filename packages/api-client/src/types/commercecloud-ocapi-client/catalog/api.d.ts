declare module 'commercecloud-ocapi-client' {
  export type GetCategoriesOptions = {
    levels?: number;
    locale?: string;
  }
  export class CategoriesApi {
    constructor();
    getCategoriesByID(id: string, opts?: GetCategoriesOptions): Promise<Category>;
  }

  export type ProductGetExapandOptions = 'availability'
    | 'bundled_products'
    | 'links'
    | 'promotions'
    | 'options'
    | 'images'
    | 'prices'
    | 'variations'
    | 'set_products';
  export type GetProductOptions = {
    expand?: ProductGetExapandOptions[];
    inventoryIds?: string[];
    currency?: string;
    locale?: string;
    allImages?: boolean;
  };
  export class ProductsApi {
    constructor();
    getProductsByID(id: string, opts?: GetProductOptions): Promise<Product>;
  }
}
