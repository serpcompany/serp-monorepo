import type { Post } from '@serp/types/types';

export const usePost = async (slug: string) => {
  return useFetchWithCache<Post>(`/post/${slug}`);
};
