import type { Category } from '~/types/Category';

export const useCompanyCategories = async () => {
  return await useFetchWithCache<Category[]>(`/company-categories`);
};
