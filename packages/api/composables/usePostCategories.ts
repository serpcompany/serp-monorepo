import type { Category } from '@serp/types/types'

export async function usePostCategories(module = '') {
  return await useFetchWithCache<Category[]>(`/categories?module=post`)
}
