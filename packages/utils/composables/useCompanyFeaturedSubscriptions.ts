export const useCompanyFeaturedSubscriptions = async (activeOnly = true) => {
  return useFetchWithCache(
    `/company/featured-subscriptions?activeOnly=${activeOnly}`
  );
};
