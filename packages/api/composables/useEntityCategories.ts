import type { Category } from '@serp/types/types'

export async function useEntityCategories(module = '') {
  return await useFetchWithCache<Category[]>(`/categories?module=${module}`)
}
