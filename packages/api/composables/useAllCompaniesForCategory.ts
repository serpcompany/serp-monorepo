import useFetchWithCache from './useFetchWithCache';

export const useAllCompaniesForCategory = async (categorySlug = '') => {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(`/entities/all-for-category`);
  }
  return useFetchWithCache(
    `/entities/all-for-category?categorySlug=${categorySlug}&module=company`
  );
};
