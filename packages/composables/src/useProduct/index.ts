import { Context, Product, ProductSearchParams } from '@vue-storefront/sfcc-api';
import { useProductFactory, ProductsSearchParams, UseProductFactoryParams } from '@vue-storefront/core';

const params: UseProductFactoryParams<Product[], ProductSearchParams> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<Product[]> => {
    if (params.id) {
      const product: Product = await context.$sfcc.api.getProduct(params.id);

      return [product];
    }

    if (params.catId) {
      const searchParams: ProductSearchParams = {
        categorySlug: params.catId,
        page: 1,
        itemsPerPage: params.limit || 8
      };

      const searchResult = await context.$sfcc.api.searchProducts(searchParams);

      return searchResult.products;
    }

    return [];
  }
};

export default useProductFactory<Product[], ProductSearchParams>(params);
