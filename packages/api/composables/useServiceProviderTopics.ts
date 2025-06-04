import type { Topic } from '@serp/types/types'

export async function useServiceProviderTopics() {
  return await useFetchWithCache<Topic[]>(`/topics&module=service_provider`)
}
