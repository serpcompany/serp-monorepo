import type { Topic } from '@serp/types/types'
import { useDataCache } from '#nuxt-multi-cache/composables'
import { getDb } from '@serp/db/server/database'
import { topic } from '@serp/db/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { module = '' } = getQuery(event)
  const cacheKey = `topics-${module}`
  const { value, addToCache } = await useDataCache(cacheKey, event)
  if (value) {
    return value
  }

  const query = getDb().select().from(topic).where(eq(topic.module, module))

  const results = await query.execute()

  const topics = results.map((t) => {
    return t as Topic
  })

  const response = topics
  addToCache(response, [], 60 * 60 * 10) // 10 hours
  return response
})
