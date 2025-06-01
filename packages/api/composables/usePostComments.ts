import type { Comment } from '@serp/types/types'

export async function usePostComments(id: number) {
  return useFetchWithCache<Comment[]>(`/comments/${id}?module=post`)
}
