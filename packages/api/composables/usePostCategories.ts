import type { Category } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function usePostCategories(): Promise<Category[]> {
  return await useFetchWithCache<Category[]>(`/categories?module=post`)
}
