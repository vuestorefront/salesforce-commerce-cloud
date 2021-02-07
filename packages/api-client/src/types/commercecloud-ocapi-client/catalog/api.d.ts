declare module 'commercecloud-ocapi-client' {
  export type GetCategoriesOptions = {
    levels?: number;
    locale?: string;
  }
  export class CategoriesApi {
    constructor();
    getCategoriesByID(id: string, opts?: GetCategoriesOptions): Promise<Category>;
  }
}
