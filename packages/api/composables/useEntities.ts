import type { Entities } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches entities with pagination and filtering
 * @param page - Page number for pagination (default: 1)
 * @param limit - Number of entities per page (default: 50)
 * @param categorySlug - Filter by category slug (default: empty string)
 * @param module - Filter by module type (default: empty string)
 * @returns Promise<Entities> Paginated entities data
 */
export async function useEntities(page = 1, limit = 50, categorySlug = '', module = '') {
  return await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&categorySlug=${categorySlug}&module=${module}`,
  )
}
