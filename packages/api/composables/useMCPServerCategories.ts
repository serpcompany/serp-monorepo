import type { Category } from '@serp/types/types'

export async function useMCPServerCategories() {
  return await useFetchWithCache<Category[]>(`/categories?module=mcp_server`)
}
