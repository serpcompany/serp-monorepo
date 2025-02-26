import type { Recording } from '@serp/types/types'

export const useSong = async (slug: string) => {
  return await useFetchWithCache<Recording>(`/songs/${slug}`)
}
