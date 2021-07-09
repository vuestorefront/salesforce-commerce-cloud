import { Product, SfccIntegrationContext } from '../../../types';

export async function getProduct(context: SfccIntegrationContext, id: string): Promise<Product> {
  if (context.config.overrides && context.config.overrides.getProduct) {
    return context.config.overrides.getProduct(context, id);
  }

  return await context.client.ProductsApi.getProduct(id, context.config.viewType, context.config.locale, context.config.currency);
}

export async function getProducts(context: SfccIntegrationContext, ids: string[]): Promise<Product[]> {
  if (context.config.overrides && context.config.overrides.getProducts) {
    return context.config.overrides.getProducts(context, ids);
  }

  return await context.client.ProductsApi.getProducts(ids, context.config.viewType, context.config.locale, context.config.currency);
}
