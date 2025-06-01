import type { ServiceProvider } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useServiceProvider(slug: string): Promise<ServiceProvider> {
  return useFetchWithCache<ServiceProvider>(
    `/entity/${slug}&module=service_provider`,
  )
}
