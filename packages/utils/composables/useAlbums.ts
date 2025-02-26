import type { ReleaseGroup } from '@serp/types/types';

export const useAlbums = async (page = 1, limit = 50) => {
  return await useFetchWithCache<ReleaseGroup>(
    `/albums?page=${page}&limit=${limit}`
  );
};
