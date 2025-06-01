import type { Entities, ReleaseGroup } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useAlbums(page = 1, limit = 50): Promise<{ albums: ReleaseGroup[] } & Omit<Entities, 'entities'>> {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&module=music_albums`,
  )
  const { entities, ...rest } = data
  return {
    ...rest,
    albums: entities as ReleaseGroup[],
  }
}
