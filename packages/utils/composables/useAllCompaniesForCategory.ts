export const useAllCompaniesForCategory = async (categorySlug = '') => {
  return useFetchWithCache(
    `/companies/all-for-category?categorySlug=${categorySlug}`
  );
};
