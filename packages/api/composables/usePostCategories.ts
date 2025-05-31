import type { Category } from '@serp/types/types';

export const usePostCategories = async (_module = '') => {
  return await useFetchWithCache<Category[]>(`/categories?module=post`);
};
