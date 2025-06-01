import useFetchWithCache from './useFetchWithCache'

export async function useAllCompaniesForCategory(categorySlug = '') {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(`/entities/all-for-category`)
  }
  return useFetchWithCache(
    `/entities/all-for-category?categorySlug=${categorySlug}&module=company`,
  )
}
