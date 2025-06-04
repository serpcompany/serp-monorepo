import type { Artist } from '@serp/types/types'

export async function useArtist(slug: string) {
  return await useFetchWithCache<Artist>(
    `/entity/${slug}?module=music_artists`,
  )
}
