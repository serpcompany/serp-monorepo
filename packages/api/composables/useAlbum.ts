import type { ReleaseGroup } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function useAlbum(slug: string): Promise<ReleaseGroup | null> {
  return await useFetchWithCache<ReleaseGroup>(
    `/entity/${slug}?module=music_albums`,
  )
}
