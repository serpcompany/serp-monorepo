export async function useCompanyFeaturedSubscriptions(activeOnly = true) {
  return useFetchWithCache(
    `/entity/featured-subscriptions?activeOnly=${activeOnly}&module=company`,
  )
}
