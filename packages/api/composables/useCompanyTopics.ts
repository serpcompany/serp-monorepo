import type { Topic } from '@serp/types/types'

export async function useCompanyTopics() {
  return await useFetchWithCache<Topic[]>(`/topics?module=company`)
}
