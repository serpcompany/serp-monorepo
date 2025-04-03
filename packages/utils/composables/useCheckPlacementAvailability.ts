export const useCheckPlacementAvailability = async (
  placement,
  domain,
  categorySlug = ''
) => {
  if (!categorySlug || categorySlug === 'all') {
    return useFetchWithCache(
      `/company/check-if-valid-feature-placement?placement=${placement}&domain=${domain}`
    );
  }
  return useFetchWithCache(
    `/company/check-if-valid-feature-placement?placement=${placement}&domain=${domain}&categorySlug=${categorySlug}`
  );
};
