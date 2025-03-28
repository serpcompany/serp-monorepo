import type { Posts } from '@serp/types/types';

export const usePosts = async (
  page = 1,
  limit = 50,
  categorySlug = '',
  module = '',
  randomize = false
) => {
  return useFetchWithCache<Posts>(
    `/posts?page=${page}&limit=${limit}&categorySlug=${categorySlug}&module=${module}&randomize=${randomize}`
  );
};
