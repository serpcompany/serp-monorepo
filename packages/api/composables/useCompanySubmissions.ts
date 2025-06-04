export async function useCompanySubmissions(id = '') {
  return useFetchWithCache(`/entity/submit?id=${id}&module=company`)
}
