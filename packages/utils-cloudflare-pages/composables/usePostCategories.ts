import type { Category } from '@serp/types/types';

export const usePostCategories = async (module = '') => {
  return await useFetchWithCache<Category[]>(
    `/post-categories?module=${module}`
  );
};
