import type { Topic } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useServiceProviderTopics(): Promise<Topic[]> {
  return await useFetchWithCache<Topic[]>(`/topics&module=service_provider`)
}
