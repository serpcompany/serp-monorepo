import type { Comment } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches comments for a specific company
 * @param id - The company ID
 * @returns Promise<Comment[]> Array of comments for the company
 */
export async function useCompanyComments(id: number) {
  return useFetchWithCache<Comment[]>(`/comments/${id}?module=company`)
}
