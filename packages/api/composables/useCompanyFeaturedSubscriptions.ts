import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches featured subscriptions for companies
 * @param activeOnly - Whether to fetch only active subscriptions (default: true)
 * @returns Promise<any> Featured subscriptions data
 */
export async function useCompanyFeaturedSubscriptions(activeOnly = true): Promise<any> {
  return useFetchWithCache(
    `/entity/featured-subscriptions?activeOnly=${activeOnly}&module=company`,
  )
}
