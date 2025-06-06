export async function useCheckPlacementAvailability(
  placement: string,
  id: number | null,
  categorySlug: string | null = '',
) {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(
      `/entity/reserve-featured-spot?placement=${placement}&id=${id}`,
    )
  }
  return useFetchWithCache(
    `/entity/reserve-featured-spot?placement=${placement}&id=${id}&categorySlug=${categorySlug}`,
  )
}
