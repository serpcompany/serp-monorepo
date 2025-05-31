import useFetchWithCache from './useFetchWithCache';

export const useCheckPlacementAvailability = async (
  // @todo - improve the typesafety of this after implementing zod
  placement: string,
  id: number | null,
  categorySlug: string | null = ''
) => {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(
      `/entity/reserve-featured-spot?placement=${placement}&id=${id}`
    );
  }
  return useFetchWithCache(
    `/entity/reserve-featured-spot?placement=${placement}&id=${id}&categorySlug=${categorySlug}`
  );
};
