import type { Comment } from '@serp/types/types'

export async function useCompanyComments(id: number) {
  return useFetchWithCache<Comment[]>(`/comments/${id}?module=company`)
}
