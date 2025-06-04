import type { Topic } from '@serp/types/types'

export async function useEntityTopics(module = '') {
  return await useFetchWithCache<Topic[]>(`/topics?module=${module}`)
}
