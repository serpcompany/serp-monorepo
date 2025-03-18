export const useCompanyUpvotes = async (id: number) => {
  return useFetchWithCache<string[]>(`/upvotes/${id}?module=companies`);
};
