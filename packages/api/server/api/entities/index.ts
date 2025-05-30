import { useDataCache } from '#nuxt-multi-cache/composables';
import { getDb } from '@serp/db/server/database';
import {
  category,
  entity,
  entityAggregate,
  subscription,
  vote
} from '@serp/db/server/database/schema';
import { and, asc, desc, eq, inArray, or, sql } from 'drizzle-orm';

import type { Entity, Pagination } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);
    const { user } = session;
    const {
      page = 1,
      limit = 100,
      categorySlug = '',
      topicSlug = '',
      name = '',
      module = '',
      filters = '',
      sort = ''
    } = getQuery(event);

    const cacheKey = `entities-${module}-${name}-${categorySlug}-${topicSlug}-${filters}-${sort}-${page}-${limit}`;
    const { value, addToCache } = await useDataCache(cacheKey, event);
    if (value) {
      const ids = value.entities.map((e: { id: number }) => e.id);

      const freshAggs = await getDb()
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
          hotScoreYear: entityAggregate.hotScoreYear
        })
        .from(entityAggregate)
        .where(inArray(entityAggregate.entity, ids))
        .execute();

      const freshVotes = await getDb()
        .select({
          entityId: vote.entity,
          direction: vote.direction
        })
        .from(vote)
        .where(
          and(
            inArray(vote.entity, ids),
            user?.id ? eq(vote.user, user?.id) : sql`FALSE`
          )
        )
        .execute();

      const aggsById = Object.fromEntries(
        freshAggs.map((a) => [a.entityId, a])
      );
      const votesById = Object.fromEntries(
        freshVotes.map((v) => [v.entityId, v.direction])
      );

      // @todo - improve the typesafety of this after implementing zod
      const entities = value.entities.map((e: Entity) => ({
        ...e,
        ...aggsById[e.id],
        usersCurrentVote: votesById[e.id]
      }));

      return {
        ...value,
        entities
      };
    }

    const pageNumber = Number(page);
    const limitNumber = Math.min(Number(limit), 100);

    if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
      throw createError({
        statusCode: 400,
        message: 'Page must be a positive integer.'
      });
    }

    if (
      isNaN(limitNumber) ||
      limitNumber < 1 ||
      !Number.isInteger(limitNumber)
    ) {
      throw createError({
        statusCode: 400,
        message: 'Limit must be a positive integer.'
      });
    }

    const offset = (pageNumber - 1) * limitNumber;

    const parseFilters = (raw: string) =>
      raw
        .split(',')
        .map((p) => {
          const [k, ...rest] = p.split(':');
          const v = rest.join(':');
          return k && v ? ([k.trim(), v.trim()] as [string, string]) : null;
        })
        .filter(Boolean) as [string, string][];

    const parsedFilters = parseFilters(filters);
    for (const [k] of parsedFilters) {
      if (!/^[a-zA-Z0-9_.]+$/.test(k)) {
        throw createError({ statusCode: 400, message: 'Bad filter key' });
      }
    }

    const jsonbPath = (col: typeof entity.data, path: string) => {
      const parts = path.split('.').map((p) => sql.raw(`'${p}'`));
      return sql`jsonb_extract_path_text(${col}, ${sql.join(parts, sql.raw(', '))})`;
    };

    const dynamicConditions = parsedFilters.map(
      ([k, v]) => sql`${jsonbPath(entity.data, k)} = ${v}`
    );

    let baseQuery = getDb()
      .select({
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        data: entity.data,
        categories: entity.categories,
        topics: entity.topics,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        module: entity.module,
        featured: sql<boolean>`CASE WHEN ${subscription.status} IN ('active', 'trialing') THEN true ELSE false END`,
        featuredOrder: sql<number>`CAST(${subscription.metadata}->>'placement' AS INTEGER)`,
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
        usersCurrentVote: vote.direction
      })
      .from(entity)
      .leftJoin(entityAggregate, eq(entity.id, entityAggregate.entity))
      .leftJoin(
        vote,
        and(
          eq(entity.id, vote.entity),
          user?.id ? eq(vote.user, user?.id) : sql`FALSE`
        )
      )
      .leftJoin(
        subscription,
        and(
          sql`${subscription.metadata}->>'entityId' = ${entity.id}::text`,
          sql`${subscription.metadata}->>'type' = 'featured'`,
          sql`${subscription.metadata}->>'module' = ${entity.module}`,
          inArray(subscription.status, ['active', 'trialing']),
          categorySlug
            ? sql`${subscription.metadata}->>'categorySlug' = ${categorySlug}`
            : sql`${subscription.metadata}->>'categorySlug' IS NULL`
        )
      );

    // @todo - improve the typesafety of this after implementing zod
    const modules = module
      .split(',')
      .map((m: string) => m.trim())
      .filter(Boolean);

    const whereConditions = [
      modules.length
        ? or(...modules.map((m: string) => eq(entity.module, m)))
        : sql`true`
    ];

    if (name) {
      whereConditions.push(
        sql`lower(${entity.name}) ilike lower(${'%' + name + '%'})`
      );
    }

    if (categorySlug) {
      whereConditions.push(
        sql`
          jsonb_path_exists(
            ${entity.categories},
            '$[*] ? (@.slug == $slug)'::jsonpath,
            jsonb_build_object('slug', ${categorySlug}::text)
          )
        `
      );
    }

    if (topicSlug) {
      whereConditions.push(
        sql`
          jsonb_path_exists(
            ${entity.topics},
            '$[*] ? (@.slug == $slug)'::jsonpath,
            jsonb_build_object('slug', ${topicSlug}::text)
          )
        `
      );
    }

    whereConditions.push(...dynamicConditions);

    let totalQuery = getDb()
      .select({ count: sql<number>`count(*)` })
      .from(entity);

    const categoryQuery = getDb()
      .select({
        id: category.id,
        name: category.name,
        slug: category.slug,
        data: category.data
      })
      .from(category)
      .where(and(eq(category.slug, categorySlug), eq(category.module, module)))
      .limit(1);

    baseQuery = baseQuery.where(and(...whereConditions));
    totalQuery = totalQuery.where(and(...whereConditions));

    const sorts = {
      'name:asc': asc(entity.name),
      'name:desc': desc(entity.name),
      'createdAt:desc': desc(entity.createdAt)
    };

    const orderByList = [
      sql`CASE WHEN ${subscription.status} IN ('active', 'trialing') THEN 0 ELSE 1 END`,
      sql`CAST(${subscription.metadata}->>'placement' AS INTEGER)`
    ];

    if (sort && sorts[sort]) {
      orderByList.push(sorts[sort]);
    }

    baseQuery = baseQuery
      .orderBy(...orderByList)
      .limit(limitNumber)
      .offset(offset);

    const [results, [{ count: total }], categoryResults] = await Promise.all([
      baseQuery.execute(),
      totalQuery.execute(),
      categoryQuery.execute()
    ]);

    if (!results.length) {
      throw createError({
        statusCode: 404,
        message: 'Not found'
      });
    }

    const entities = results.map((e) => {
      const { data, ...rest } = e as Entity;
      return { ...rest, ...data };
    });

    const pagination: Pagination = {
      currentPage: pageNumber,
      pageSize: limitNumber,
      totalItems: Number(total)
    };

    const category_ = categoryResults.length ? categoryResults[0] : null;

    const response = {
      entities,
      pagination,
      category: category_
    };

    const cacheResponse = {
      entities: entities.map(({ usersCurrentVote, ...rest }) => rest),
      pagination,
      category: category_
    };

    addToCache(cacheResponse, [], 60 * 60 * 10);
    return response;
  } catch (error) {
    console.error('Error fetching entities:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error'
    });
  }
});
