import type { Comment } from '@serp/types/types'

export async function useServiceProviderComments(id: number) {
  return useFetchWithCache<{ comments: Comment[] }>(
    `/comments/${id}?module=service_provider`,
  )
}
