import type { Reviews } from '@serp/types/types';
import useFetchWithCache from './useFetchWithCache';

/**
 * Fetches reviews for a specific company
 * @param id - The company ID
 * @param page - Page number for pagination (default: 1)
 * @param limit - Number of reviews per page (default: 25)
 * @returns Promise<{reviews: Reviews}> Paginated reviews data
 */
export const useCompanyReviews = async (id: number, page = 1, limit = 25) => {
  return useFetchWithCache<{ reviews: Reviews }>(
    `/reviews/${id}?page=${page}&limit=${limit}`
  );
};
