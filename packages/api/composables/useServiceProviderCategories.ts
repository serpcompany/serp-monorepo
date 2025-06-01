import type { Category } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useServiceProviderCategories(): Promise<Category[]> {
  return await useFetchWithCache<Category[]>(
    `/categories?module=service_provider`,
  )
}
