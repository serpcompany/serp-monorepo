export const useCompanySubmissions = async (id = '') => {
  return useFetchWithCache(`/company/submit?id=${id}`);
};
