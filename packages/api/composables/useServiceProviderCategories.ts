import type { Category } from '@serp/types/types'

export async function useServiceProviderCategories() {
  return await useFetchWithCache<Category[]>(
    `/categories?module=service_provider`,
  )
}
