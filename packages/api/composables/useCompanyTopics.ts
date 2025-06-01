import type { Topic } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches all topics for companies
 * @returns Promise<Topic[]> Array of company topics
 */
export async function useCompanyTopics() {
  return await useFetchWithCache<Topic[]>(`/topics?module=company`)
}
