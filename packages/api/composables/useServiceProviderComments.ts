import type { Comment } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useServiceProviderComments(id: number): Promise<{ comments: Comment[] }> {
  return useFetchWithCache<{ comments: Comment[] }>(
    `/comments/${id}?module=service_provider`,
  )
}
