import { Category } from '../../../types';
import { baseMapping } from './ocapiBaseMapping';
import { Category as ApiCategory } from 'commercecloud-ocapi-client';

export const mapOcapiCategory = (apiCategory: ApiCategory): Category => {
  const category = baseMapping<Category>(apiCategory);

  if (apiCategory.categories) {
    category.categories = apiCategory.categories.map(mapOcapiCategory);
  }

  return category;
};
