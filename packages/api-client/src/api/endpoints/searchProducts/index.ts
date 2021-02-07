import { ProductSearchParams, ProductSearchResponse, SfccIntegrationContext } from '../../../types';

export default async function searchProducts(context: SfccIntegrationContext, params: ProductSearchParams): Promise<ProductSearchResponse> {
  if (context.config.overrides && context.config.overrides.searchProducts) {
    return context.config.overrides.searchProducts(context, params);
  }

  return await context.client.ProductSearchApi.searchProducts(params, context.config.locale);
}
