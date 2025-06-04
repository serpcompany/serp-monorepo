import type { Companies, Entities } from '@serp/types/types';

export const useCompanies = async (
  page = 1,
  limit = 50,
  categorySlug = '',
  name = '',
  sort = ''
) => {
  const data = await useFetchWithCache<Entities>(
    `/entities?page=${page}&limit=${limit}&categorySlug=${categorySlug}&name=${name}&sort=${sort}&module=company`
  );
  if (!data) {
    return data;
  }
  const { entities, ...rest } = data;
  return {
    ...rest,
    companies: entities
  } as Companies;
};
