import type { Entities, ReleaseGroup } from '@serp/types/types';

export const useAlbums = async (page = 1, limit = 50) => {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&module=music_albums`
  );
  const { entities, ...rest } = data;
  return {
    ...rest,
    albums: entities as ReleaseGroup[]
  };
};
