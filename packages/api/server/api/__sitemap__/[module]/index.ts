import { useDataCache } from '#nuxt-multi-cache/composables'
import { getDb } from '@serp/db/server/database'
import { entity } from '@serp/db/server/database/schema'
import { eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { page, count = false } = getQuery(event)
  const limit = 50000
  const module = getRouterParam(event, 'module')

  if (!module) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Module parameter is required',
    })
  }

  const cacheKey = `${module}-sitemap-${page}-${count}`
  const { value, addToCache } = await useDataCache(cacheKey, event)
  if (value) {
    return value
  }

  if (count) {
    const totalItems = await getDb()
      .select({ count: sql<number>`count(*)` })
      .from(entity)
      .where(eq(entity.module, module))
      .execute()

    const totalPages = Math.ceil(Number(totalItems[0].count) / limit)
    addToCache(totalPages, [], 60 * 60 * 10) // 10 hours
    return totalPages
  }

  const entities = await getDb()
    .select({
      slug: entity.slug,
    })
    .from(entity)
    .where(eq(entity.module, module))
    .limit(limit)
    .offset(limit * (Number(page) - 1))
    .execute()

  const response = entities.map(
    (entity_: { slug: string }) => `${encodeURIComponent(entity_.slug)}/`,
  )

  addToCache(response, [], 60 * 60 * 10) // 10 hours
  return response
})
