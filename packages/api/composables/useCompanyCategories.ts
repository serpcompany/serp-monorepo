import type { Category } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches all categories for companies
 * @returns Promise<Category[]> Array of company categories
 */
export async function useCompanyCategories(): Promise<Category[]> {
  return await useFetchWithCache<Category[]>(`/categories?module=company`)
}
