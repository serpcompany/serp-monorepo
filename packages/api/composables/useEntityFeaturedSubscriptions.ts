import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches featured subscriptions for entities
 * @param activeOnly - Whether to fetch only active subscriptions (default: true)
 * @param module - The module type (default: empty string)
 * @returns Promise<any> Featured subscriptions data
 */
export async function useEntityFeaturedSubscriptions(activeOnly = true, module = ''): Promise<any> {
  return useFetchWithCache(
    `/entity/featured-subscriptions?activeOnly=${activeOnly}&module=${module}`,
  )
}
