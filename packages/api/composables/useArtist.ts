import type { Artist } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useArtist(slug: string): Promise<Artist> {
  return await useFetchWithCache<Artist>(
    `/entity/${slug}?module=music_artists`,
  )
}
