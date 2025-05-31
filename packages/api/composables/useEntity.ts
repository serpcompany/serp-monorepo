import type { Entity } from '@serp/types/types';
import useFetchWithCache from './useFetchWithCache';

/**
 * Fetches a single entity by slug
 * @param slug - The entity slug identifier
 * @param module - Optional module filter (default: empty string)
 * @returns Promise<Entity> The entity data
 */
export const useEntity = async (slug: string, module = '') => {
  return useFetchWithCache<Entity>(`/entity/${slug}?module=${module}`);
};
