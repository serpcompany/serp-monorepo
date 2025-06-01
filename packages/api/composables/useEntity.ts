import type { Entity } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches a single entity by slug
 * @param slug - The entity slug identifier
 * @param module - Optional module filter (default: empty string)
 * @returns Promise<Entity> The entity data
 */
export async function useEntity(slug: string, module = ''): Promise<Entity> {
  return useFetchWithCache<Entity>(`/entity/${slug}?module=${module}`)
}
