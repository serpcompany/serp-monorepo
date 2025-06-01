import type { Post } from '@serp/types/types'
import useFetchWithCache from './useFetchWithCache'

export async function usePost(slug: string, module = ''): Promise<Post> {
  return useFetchWithCache<Post>(
    `/entity/${encodeURIComponent(slug)}?module=post&filters=module:${module}`,
  )
}
