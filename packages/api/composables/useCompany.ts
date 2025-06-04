import type { Company, ServiceProvider } from '@serp/types/types'

export async function useCompany(slug: string) {
  return useFetchWithCache<Company | ServiceProvider>(
    `/entity/${slug}?module=company,service_provider`,
  )
}
