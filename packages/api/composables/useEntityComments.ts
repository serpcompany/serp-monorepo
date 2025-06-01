import type { Comment } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches comments for a specific entity
 * @param id - The entity ID
 * @param module - The module type (default: empty string)
 * @returns Promise<Comment[]> Array of comments for the entity
 */
export async function useEntityComments(id: number, module = ''): Promise<Comment[]> {
  return useFetchWithCache<Comment[]>(`/comments/${id}?module=${module}`)
}
