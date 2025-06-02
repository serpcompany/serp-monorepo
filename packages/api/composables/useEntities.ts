import type { Entities } from '@serp/types/types'

export async function useEntities(page = 1, limit = 50, categorySlug = '', module = '') {
  return await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&categorySlug=${categorySlug}&module=${module}`,
  )
}
