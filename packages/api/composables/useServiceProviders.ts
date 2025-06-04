import type {
  Entities,
  ServiceProviderIndex,
  ServiceProviders,
} from '@serp/types/types'

export async function useServiceProviders(
  page = 1,
  limit = 50,
  categorySlug = '',
  topicSlug = '',
) {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&categorySlug=${categorySlug}&topicSlug=${topicSlug}&module=service_provider`,
  )
  const { entities, ...rest } = data
  return {
    ...rest,
    serviceProviders: entities as ServiceProviderIndex[],
  } as ServiceProviders
}
