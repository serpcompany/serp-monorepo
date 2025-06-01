import type { Category } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches categories for entities by module
 * @param module - The module type to filter categories (default: empty string)
 * @returns Promise<Category[]> Array of categories
 */
export async function useEntityCategories(module = '') {
  return await useFetchWithCache<Category[]>(`/categories?module=${module}`)
}
