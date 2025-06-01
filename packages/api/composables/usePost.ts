import type { Post } from '@serp/types/types'

export async function usePost(slug: string, module = '') {
  return useFetchWithCache<Post>(
    `/entity/${encodeURIComponent(slug)}?module=post&filters=module:${module}`,
  )
}
