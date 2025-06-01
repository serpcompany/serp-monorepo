import type { Company, ServiceProvider } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useCompany(slug: string): Promise<Company | ServiceProvider> {
  return useFetchWithCache<Company | ServiceProvider>(
    `/entity/${slug}?module=company,service_provider`,
  )
}
