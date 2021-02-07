import { Product, SfccIntegrationContext } from '../../../types';

export default async function getProduct(context: SfccIntegrationContext, id: string): Promise<Product> {
  if (context.config.overrides && context.config.overrides.getProduct) {
    return context.config.overrides.getProduct(context, id);
  }

  return await context.client.ProductsApi.getProduct(id, context.config.viewType, context.config.locale);
}
