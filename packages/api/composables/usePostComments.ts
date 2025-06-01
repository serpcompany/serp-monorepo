import type { Comment } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function usePostComments(id: number): Promise<Comment[]> {
  return useFetchWithCache<Comment[]>(`/comments/${id}?module=post`)
}
