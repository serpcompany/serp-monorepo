import { useDataCache } from '#nuxt-multi-cache/composables';
import { getDb } from '@serp/db/server/database';
import {
  entity,
  entityAggregate,
  verification,
  vote
} from '@serp/db/server/database/schema';
import { and, eq, or, sql } from 'drizzle-orm';

import type { Entity } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);
    const { user } = session;
    const { module = '', filters = '' } = getQuery(event);
    const slug = decodeURIComponent(getRouterParam(event, 'slug'));

    const cacheKey = `entity-${module}-${slug}`;
    const { value, addToCache } = await useDataCache(cacheKey, event);
    if (value) {
      const id = value.id;

      const [agg] = await getDb()
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
        .where(eq(entityAggregate.entity, id))
        .limit(1)
        .execute();

      const [v] = await getDb()
        .select({ direction: vote.direction })
        .from(vote)
        .where(
          and(
            eq(vote.entity, id),
            user?.id ? eq(vote.user, user?.id) : sql`false`
          )
        )
        .limit(1)
        .execute();

      const [ver] = await getDb()
        .select({ user: verification.user })
        .from(verification)
        .where(eq(verification.entity, id))
        .limit(1)
        .execute();

      return {
        ...value,
        ...(agg ?? {}),
        usersCurrentVote: v?.direction,
        verification: ver?.user
      };
    }

    const parseFilters = (raw: string) =>
      raw
        .split(',')
        .map((pair) => {
          const [key, ...rest] = pair.split(':');
          const value = rest.join(':');
          return key && value
            ? ([key.trim(), value.trim()] as [string, string])
            : null;
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
      ([key, value]) => sql`${jsonbPath(entity.data, key)} = ${value}`
    );

    let baseQuery = getDb()
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
        verification: verification.user
      })
      .from(entity)
      .leftJoin(entityAggregate, eq(entity.id, entityAggregate.entity))
      .leftJoin(
        vote,
        and(
          eq(entity.id, vote.entity),
          user?.id ? eq(vote.user, user?.id) : sql`false`
        )
      )
      .leftJoin(verification, eq(entity.id, verification.entity));

    // @todo - improve the typesafety of this after implementing zod
    const modules = module
      .split(',')
      .map((mod: string) => mod.trim())
      .filter(Boolean);

    const whereConditions = [
      modules.length
        ? or(...modules.map((mod: string) => eq(entity.module, mod)))
        : sql`true`
    ];

    whereConditions.push(
      or(eq(entity.slug, slug), eq(entity.id, Number(slug) ? Number(slug) : 0))
    );

    whereConditions.push(...dynamicConditions);

    baseQuery = baseQuery.where(and(...whereConditions)).limit(1);

    const results = await baseQuery.execute();
    if (results.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Entity not found'
      });
    }

    const { data, singleData, ...rest } = results[0] as Entity;

    const entity_ = {
      ...data,
      ...singleData,
      ...rest
    };

    const {
      usersCurrentVote,
      verification: verification_,
      ...entityNoVote
    } = entity_;
    const cacheResponse = entityNoVote;
    addToCache(cacheResponse, [], 60 * 60 * 10);
    return entity_;
  } catch (error) {
    console.error('Error fetching entity:', error);
    throw createError({
      statusCode: 500,
      message: 'Internal Server Error'
    });
  }
});
