import type { Comment } from '@serp/types/types';

export const useCompanyComments = async (id: number) => {
  return useFetchWithCache<Comment[]>(`/company/comments/${id}`);
};
