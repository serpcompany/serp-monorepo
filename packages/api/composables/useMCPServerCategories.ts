import type { Category } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useMCPServerCategories(): Promise<Category[]> {
  return await useFetchWithCache<Category[]>(`/categories?module=mcp_server`)
}
