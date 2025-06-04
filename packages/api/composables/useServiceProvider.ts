import type { ServiceProvider } from '@serp/types/types'

export async function useServiceProvider(slug: string) {
  return useFetchWithCache<ServiceProvider>(
    `/entity/${slug}&module=service_provider`,
  )
}
