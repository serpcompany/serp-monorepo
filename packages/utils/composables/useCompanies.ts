import type { Companies } from '@/types';

export const useCompanies = async (page = 1, limit = 50, categorySlug = '') => {
  return useFetchWithCache<Companies>(
    `/companies?page=${page}&limit=${limit}&categorySlug=${categorySlug}`
  );
};
