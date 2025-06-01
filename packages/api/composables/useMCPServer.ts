import type { MCPServer } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useMCPServer(slug: string): Promise<MCPServer> {
  return useFetchWithCache<MCPServer>(`/entity/${slug}?module=mcp_server`)
}
