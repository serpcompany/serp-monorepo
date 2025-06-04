import type { MCPServer } from '@serp/types/types'

export async function useMCPServer(slug: string) {
  return useFetchWithCache<MCPServer>(`/entity/${slug}?module=mcp_server`)
}
