export const useCompanyUpvotes = async (id: number) => {
  return useFetchWithCache<string[]>(`/company/upvotes/${id}`);
};
