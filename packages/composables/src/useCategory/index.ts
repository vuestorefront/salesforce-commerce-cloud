import {
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { CategorySearchParams } from '../types';
import { Context, Category } from '@vue-storefront/sfcc-api';

const params: UseCategoryFactoryParams<Category, CategorySearchParams> = {
  categorySearch: async (context: Context, params: CategorySearchParams): Promise<Category[]> => {
    const category = await context.$sfcc.api.getCategory(params.slug);

    if (category && category.categories && params.target === 'menu') {
      category.categories = category.categories.filter((item) => item.c_showInMenu);
    }

    return category.categories as Category[];
  }
};

export default useCategoryFactory<Category, any>(params);
