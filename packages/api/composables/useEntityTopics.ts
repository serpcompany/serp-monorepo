import type { Topic } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useEntityTopics(module = ''): Promise<Topic[]> {
  return await useFetchWithCache<Topic[]>(`/topics?module=${module}`)
}
