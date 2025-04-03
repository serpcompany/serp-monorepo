export const useAllCompaniesForCategory = async (categorySlug = '') => {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(`/companies/all-for-category`);
  }
  return useFetchWithCache(
    `/companies/all-for-category?categorySlug=${categorySlug}`
  );
};
