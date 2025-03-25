import type { Link } from '@serp/types/types';

export const useShortlinks = async () => {
  return await useFetchWithCache<{ key: string; data: Link[]; email: string }>(
    `/link/list`
  );
};
