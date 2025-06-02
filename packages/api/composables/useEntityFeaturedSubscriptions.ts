export async function useEntityFeaturedSubscriptions(activeOnly = true, module = '') {
  return useFetchWithCache(
    `/entity/featured-subscriptions?activeOnly=${activeOnly}&module=${module}`,
  )
}
