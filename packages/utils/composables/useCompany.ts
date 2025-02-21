import type { Company } from '@serp/types/types';

export const useCompany = async (slug: string) => {
  return useFetchWithCache<Company>(`/company/${slug}`);
};
