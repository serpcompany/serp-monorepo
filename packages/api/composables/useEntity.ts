import type { Entity } from '@serp/types/types'

export async function useEntity(slug: string, module = '') {
  return useFetchWithCache<Entity>(`/entity/${slug}?module=${module}`)
}
