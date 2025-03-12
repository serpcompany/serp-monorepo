import type { Post } from '@serp/types/types';

export const usePost = async (slug: string, module = '') => {
  return useFetchWithCache<Post>(`/post/${slug}?module=${module}`);
};
