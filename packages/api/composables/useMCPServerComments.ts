import type { Comment } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useMCPServerComments(id: number): Promise<{ comments: Comment[] }> {
  return useFetchWithCache<{ comments: Comment[] }>(
    `/comments/${id}?module=mcp_server`,
  )
}
