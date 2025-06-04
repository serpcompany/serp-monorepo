import type { ReleaseGroup } from '@serp/types/types'

export async function useAlbum(slug: string) {
  return await useFetchWithCache<ReleaseGroup>(
    `/entity/${slug}?module=music_albums`,
  )
}
