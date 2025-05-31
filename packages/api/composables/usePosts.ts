import type { Entities, PostIndex, Posts } from '@serp/types/types';

export const usePosts = async (
  page = 1,
  limit = 50,
  categorySlug = '',
  module = '',
  randomize = false
) => {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&categorySlug=${categorySlug}&module=post&randomize=${randomize}&filters=module:${module}`
  );
  const { entities, ...rest } = data;
  return {
    ...rest,
    posts: entities as PostIndex[]
  } as Posts;
};
