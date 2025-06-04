import type { Comment } from '@serp/types/types'

export async function useMCPServerComments(id: number) {
  return useFetchWithCache<{ comments: Comment[] }>(
    `/comments/${id}?module=mcp_server`,
  )
}
