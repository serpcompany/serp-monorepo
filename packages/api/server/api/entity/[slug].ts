import type { Entity, User } from '@serp/types/types'
import { useDataCache } from '#nuxt-multi-cache/composables'
import { getDb } from '@serp/db/server/database'

import {
  entity,
  entityAggregate,
  verification,
  vote,
} from '@serp/db/server/database/schema'
import { and, eq, or, sql } from 'drizzle-orm'

/**
 * Represents a user session with optional user data
 */
interface UserSession {
  user?: Pick<User, 'id'>
}

/**
 * Represents cached entity data returned from the cache
 */
interface CachedEntity {
  id: number
  [key: string]: any
}

/**
 * Event handler for retrieving entity data by slug
 *
 * @param event - H3Event object containing request data
 * @returns Promise<Entity> - Complete entity data with aggregates and user-specific data
 *
 * @throws {Error} 400 - Bad filter key format
 * @throws {Error} 404 - Entity not found
 * @throws {Error} 500 - Internal server error
 *
 * @example
 * // GET /api/entity/example-slug?module=companies&filters=category:saas,type:startup
 * // Returns entity with aggregated data and user's current vote/verification status
 */
export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event) as UserSession
    const { user } = session
    const query = getQuery(event)
    const { module = '', filters = '' } = query
    const slug = getRouterParam(event, 'slug')

    if (!slug) {
      throw createError({
        statusCode: 400,
        message: 'Slug parameter is required',
      })
    }

    const decodedSlug = decodeURIComponent(slug)

    const cacheKey = `entity-${module}-${decodedSlug}`
    const { value, addToCache } = await useDataCache(cacheKey, event)
    if (value) {
      const cachedValue = value as CachedEntity
      const id = cachedValue.id

      const db = getDb()
      if (!db) {
        throw createError({
          statusCode: 500,
          message: 'Database connection not available',
        })
      }

      const aggResults = await db
        .select({
          entityId: entityAggregate.entity,
          numReviews: entityAggregate.numReviews,
          numOneStarReviews: entityAggregate.numOneStarReviews,
          numTwoStarReviews: entityAggregate.numTwoStarReviews,
          numThreeStarReviews: entityAggregate.numThreeStarReviews,
          numFourStarReviews: entityAggregate.numFourStarReviews,
          numFiveStarReviews: entityAggregate.numFiveStarReviews,
          averageRating: entityAggregate.averageRating,
          numUpvotes: entityAggregate.numUpvotes,
          numDownvotes: entityAggregate.numDownvotes,
          hotScore: entityAggregate.hotScore,
          hotScoreHour: entityAggregate.hotScoreHour,
          hotScoreDay: entityAggregate.hotScoreDay,
          hotScoreWeek: entityAggregate.hotScoreWeek,
          hotScoreMonth: entityAggregate.hotScoreMonth,
          hotScoreYear: entityAggregate.hotScoreYear,
        })
        .from(entityAggregate)
        .where(eq(entityAggregate.entity, id))
        .limit(1)
        .execute()
      const agg = aggResults[0] || null

      const voteResults = await db
        .select({ direction: vote.direction })
        .from(vote)
        .where(
          and(
            eq(vote.entity, id),
            user?.id ? eq(vote.user, user?.id) : sql`false`,
          ),
        )
        .limit(1)
        .execute()
      const v = voteResults[0] || null

      const verResults = await db
        .select({ user: verification.user })
        .from(verification)
        .where(eq(verification.entity, id))
        .limit(1)
        .execute()
      const ver = verResults[0] || null

      return {
        ...cachedValue,
        ...(agg ?? {}),
        usersCurrentVote: v?.direction,
        verification: ver?.user,
      }
    }

    /**
     * Parse filter string into key-value pairs
     * @param raw - Raw filter string in format "key1:value1,key2:value2"
     * @returns Array of [key, value] tuples
     */
    const parseFilters = (raw: string | string[] | number | boolean | Record<string, any> | null): [string, string][] => {
      if (typeof raw !== 'string') {
        return []
      }

      return raw
        .split(',')
        .map((pair) => {
          const [key, ...rest] = pair.split(':')
          const value = rest.join(':')
          return key && value
            ? ([key.trim(), value.trim()] as [string, string])
            : null
        })
        .filter(Boolean) as [string, string][]
    }

    const parsedFilters = parseFilters(filters)
    for (const [k] of parsedFilters) {
      if (!/^[\w.]+$/.test(k)) {
        throw createError({ statusCode: 400, message: 'Bad filter key' })
      }
    }

    const jsonbPath = (col: typeof entity.data, path: string) => {
      const parts = path.split('.').map(p => sql.raw(`'${p}'`))
      return sql`jsonb_extract_path_text(${col}, ${sql.join(parts, sql.raw(', '))})`
    }

    const dynamicConditions = parsedFilters.map(
      ([key, value]) => sql`${jsonbPath(entity.data, key)} = ${value}`,
    )

    const db = getDb()
    if (!db) {
      throw createError({
        statusCode: 500,
        message: 'Database connection not available',
      })
    }

    const baseQuery = db
      .select({
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        data: entity.data,
        singleData: entity.singleData,
        categories: entity.categories,
        topics: entity.topics,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        module: entity.module,
        numReviews: entityAggregate.numReviews,
        numOneStarReviews: entityAggregate.numOneStarReviews,
        numTwoStarReviews: entityAggregate.numTwoStarReviews,
        numThreeStarReviews: entityAggregate.numThreeStarReviews,
        numFourStarReviews: entityAggregate.numFourStarReviews,
        numFiveStarReviews: entityAggregate.numFiveStarReviews,
        averageRating: entityAggregate.averageRating,
        numUpvotes: entityAggregate.numUpvotes,
        numDownvotes: entityAggregate.numDownvotes,
        hotScore: entityAggregate.hotScore,
        hotScoreHour: entityAggregate.hotScoreHour,
        hotScoreDay: entityAggregate.hotScoreDay,
        hotScoreWeek: entityAggregate.hotScoreWeek,
        hotScoreMonth: entityAggregate.hotScoreMonth,
        hotScoreYear: entityAggregate.hotScoreYear,
        usersCurrentVote: vote.direction,
        verification: verification.user,
      })
      .from(entity)
      .leftJoin(entityAggregate, eq(entity.id, entityAggregate.entity))
      .leftJoin(
        vote,
        and(
          eq(entity.id, vote.entity),
          user?.id ? eq(vote.user, user?.id) : sql`false`,
        ),
      )
      .leftJoin(verification, eq(entity.id, verification.entity))

    /**
     * Parse module string into array of module names
     * @param moduleParam - Module parameter from query
     * @returns Array of module names
     */
    const parseModules = (moduleParam: string | string[] | number | boolean | Record<string, any> | null): string[] => {
      if (typeof moduleParam !== 'string') {
        return []
      }

      return moduleParam
        .split(',')
        .map((mod: string) => mod.trim())
        .filter(Boolean)
    }

    const modules = parseModules(module)

    const whereConditions = [
      modules.length
        ? or(...modules.map((mod: string) => eq(entity.module, mod)))
        : sql`true`,
    ]

    whereConditions.push(
      or(eq(entity.slug, decodedSlug), eq(entity.id, Number(decodedSlug) ? Number(decodedSlug) : 0)),
    )

    whereConditions.push(...dynamicConditions)

    const results = await baseQuery.where(and(...whereConditions)).limit(1).execute()
    if (results.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Entity not found',
      })
    }

    const result = results[0]
    const { data, singleData, ...rest } = result as unknown as Entity

    const entity_ = {
      ...data,
      ...singleData,
      ...rest,
    }

    const {
      usersCurrentVote,
      verification: verification_,
      ...entityNoVote
    } = entity_ as Entity & { usersCurrentVote?: number | null, verification?: number | null }
    const cacheResponse = entityNoVote
    addToCache(cacheResponse, [], 60 * 60 * 10)
    return entity_
  }
  catch (error) {
    console.error('Error fetching entity:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error',
    })
  }
})
