import type { Artist } from '@serp/types/types'

export const useArtists = async (page = 1, limit = 50) => {
  return await useFetchWithCache<Artist>(`/artists?page=${page}&limit=${limit}`)
}
