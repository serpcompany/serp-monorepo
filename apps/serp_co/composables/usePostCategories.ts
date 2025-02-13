import type { Category } from '~/types';

export const usePostCategories = async (module = '') => {
  return await useFetchWithCache<Category[]>(
    `/post-categories?module=${module}`
  );
};
