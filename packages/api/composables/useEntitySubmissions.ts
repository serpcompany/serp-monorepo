export async function useEntitySubmissions(id = '') {
  return useFetchWithCache(`/entity/submit?id=${id}`)
}
