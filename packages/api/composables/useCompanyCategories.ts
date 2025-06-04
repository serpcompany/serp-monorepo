import type { Category } from '@serp/types/types'

export async function useCompanyCategories() {
  return await useFetchWithCache<Category[]>(`/categories?module=company`)
}
