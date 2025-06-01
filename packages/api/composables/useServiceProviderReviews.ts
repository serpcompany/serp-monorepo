import type { Reviews } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useServiceProviderReviews(id: number, page = 1, limit = 25): Promise<{ reviews: Reviews }> {
  return useFetchWithCache<{ reviews: Reviews }>(
    `/reviews/${id}?page=${page}&limit=${limit}&module=service_provider`,
  )
}
