import type { Artist } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useArtist(slug: string) {
  return await useFetchWithCache<Artist>(
    `/entity/${slug}?module=music_artists`,
  )
}
