import type { Post } from '@/types';

export const usePost = async (slug: string) => {
  return useFetchWithCache<Post>(`/post/${slug}`);
};
