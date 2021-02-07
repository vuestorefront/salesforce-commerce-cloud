import { Category, SfccIntegrationContext } from '../../../types';

export default async function getCategory(context: SfccIntegrationContext, id: string, levels?: number): Promise<Category> {
  if (context.config.overrides && context.config.overrides.getCategory) {
    return context.config.overrides.getCategory(context, id, levels);
  }

  return await context.client.CategoriesApi.getCategory(id, levels || 1, context.config.locale);
}
