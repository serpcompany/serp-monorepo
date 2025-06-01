import type { Entities } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useAllEntitiesForCategory(categorySlug = ''): Promise<Entities> {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(`/entities/all-for-category`)
  }
  return useFetchWithCache(
    `/entities/all-for-category?categorySlug=${categorySlug}`,
  )
}
