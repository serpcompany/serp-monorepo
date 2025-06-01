import type { Company, ServiceProvider } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useCompany(slug: string) {
  return useFetchWithCache<Company | ServiceProvider>(
    `/entity/${slug}?module=company,service_provider`,
  )
}
