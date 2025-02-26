import type { Recording } from '@serp/types/types';

export const useSongs = async (page = 1, limit = 50) => {
  return await useFetchWithCache<Recording>(
    `/songs?page=${page}&limit=${limit}`
  );
};
