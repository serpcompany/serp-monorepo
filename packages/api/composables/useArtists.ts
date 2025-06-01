import type { Artist, Entities } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useArtists(page = 1, limit = 50): Promise<{ artists: Artist[] } & Omit<Entities, 'entities'>> {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&module=music_artists`,
  )
  const { entities, ...rest } = data
  return {
    ...rest,
    artists: entities as Artist[],
  }
}
