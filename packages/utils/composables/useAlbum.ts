import type { ReleaseGroup } from '@serp/types/types';

export const useAlbum = async (slug: string) => {
  return await useFetchWithCache<ReleaseGroup>(`/albums/${slug}`);
};
