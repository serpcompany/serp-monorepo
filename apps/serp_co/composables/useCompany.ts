import type { Company } from '@/types/company';

export const useCompany = async (slug: string) => {
  return useFetchWithCache<Company>(`/company/${slug}`);
};
