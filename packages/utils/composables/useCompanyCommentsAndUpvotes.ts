import type { Comment } from '@serp/types/types';

export const useCompanyUpvotesAndComments = async (id: number) => {
  return useFetchWithCache<{ comments: Comment[], upvotes: string[] }>(`/comments/${id}?module=companies&includeUpvotes=true`);
};
