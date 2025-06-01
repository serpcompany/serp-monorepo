import useFetchWithCache from './useFetchWithCache'

export async function useEntitySubmissions(id = ''): Promise<any> {
  return useFetchWithCache(`/entity/submit?id=${id}`)
}
