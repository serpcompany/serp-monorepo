import type { Artist, Entities } from '@serp/types/types';

export const useArtists = async (page = 1, limit = 50) => {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&module=music_artists`
  );
  const { entities, ...rest } = data;
  return {
    ...rest,
    artists: entities as Artist[]
  };
};
