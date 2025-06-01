import type { Entities, Recording } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useSongs(page = 1, limit = 50): Promise<{ songs: Recording[] } & Omit<Entities, 'entities'>> {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&module=music_songs`,
  )
  const { entities, ...rest } = data
  return {
    ...rest,
    songs: entities as Recording[],
  }
}
