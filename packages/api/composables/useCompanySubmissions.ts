import useFetchWithCache from './useFetchWithCache'

/**
 * Fetches company submission data
 * @param id - The company ID (default: empty string)
 * @returns Promise<any> Company submission data
 */
export async function useCompanySubmissions(id = ''): Promise<any> {
  return useFetchWithCache(`/entity/submit?id=${id}&module=company`)
}
