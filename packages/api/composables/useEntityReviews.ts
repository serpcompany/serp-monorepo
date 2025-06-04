import type { Reviews } from '@serp/types/types'

export async function useEntityReviews(id: number, page = 1, limit = 25) {
  return useFetchWithCache<{ reviews: Reviews }>(
    `/reviews/${id}?page=${page}&limit=${limit}`,
  )
}
