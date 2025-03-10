import { useDrizzle } from '../db';
import { boxerCache } from '../db/schema';
import { sql } from 'drizzle-orm';
import type { BoxerIndex, Pagination } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100, weightClassSlug } = getQuery(event);

  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);

  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Page must be a positive integer.'
    });
  }

  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Limit must be a positive integer.'
    });
  }

  const offset = (pageNumber - 1) * limitNumber;

  let baseQuery = useDrizzle()
    .select({
      id: boxerCache.id,
      name: boxerCache.name,
      slug: boxerCache.slug,
      division: boxerCache.division
    })
    .from(boxerCache);

  if (weightClassSlug) {
    baseQuery = baseQuery.where(
      sql`
        jsonb_path_exists(
          ${boxerCache.division},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${weightClassSlug}::text)
        )
      `
    );
  }
  baseQuery = baseQuery
    .orderBy(boxerCache.name)
    .limit(limitNumber)
    .offset(offset);

  let totalQuery = useDrizzle()
    .select({ count: sql<number>`count(*)` })
    .from(boxerCache);

  if (weightClassSlug) {
    totalQuery = totalQuery.where(
      sql`
        jsonb_path_exists(
          ${boxerCache.division},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${weightClassSlug}::text)
        )
      `
    );
  }

  const [results, [{ count: total }]] = await Promise.all([
    baseQuery.execute(),
    totalQuery.execute()
  ]);

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    });
  }

  const boxers = results.map((boxer) => boxer as BoxerIndex);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const response = {
    boxers,
    pagination
  };

  return response;
});
