import type { Comment } from '@serp/types/types'

export async function useEntityComments(id: number, module = '') {
  return useFetchWithCache<Comment[]>(`/comments/${id}?module=${module}`)
}
