import { useDrizzle } from '../db';
import { mbReleaseGroupCache } from '../db/schema';
import { sql } from 'drizzle-orm';
import type { ReleaseGroupBase, Pagination } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100 } = getQuery(event);

  // Convert and validate pagination parameters
  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);

  // Validate numbers are positive integers
  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Page must be a positive integer..'
    });
  }

  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Limit must be a positive integer'
    });
  }

  // Calculate offset for pagination
  const offset = (pageNumber - 1) * limitNumber;

  // Build the query with limit and offset
  const query = useDrizzle()
    .select({
      name: mbReleaseGroupCache.name,
      slug: mbReleaseGroupCache.slug,
      artists: mbReleaseGroupCache.artists
    })
    .from(mbReleaseGroupCache)
    .orderBy(
      sql`${mbReleaseGroupCache.artists}->0->>'credit_name'`,
      mbReleaseGroupCache.name
    )
    .limit(limitNumber)
    .offset(offset);

  // Get total count for pagination
  const totalQuery = useDrizzle()
    .select({ count: sql<number>`count(*)` })
    .from(mbReleaseGroupCache);

  const [rawAlbums, [{ count: total }]] = await Promise.all([
    query.execute(),
    totalQuery.execute()
  ]);

  const albums = rawAlbums.map((album) => album as ReleaseGroupBase);
  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const response = {
    albums,
    pagination
  };

  return response;
});
