import { useDrizzle } from '../db';
import { mbMetadataCache } from '../db/schema';
import { sql } from 'drizzle-orm';
import type { RecordingIndex, Pagination } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 50 } = getQuery(event);

  // Convert and validate pagination parameters
  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);

  // Validate numbers are positive integers
  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Page must be a positive integer'
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
      name: mbMetadataCache.name,
      slug: mbMetadataCache.slug,
      artists: mbMetadataCache.artists,
      releaseGroup: mbMetadataCache.releaseGroup
    })
    .from(mbMetadataCache)
    .orderBy(
      sql`${mbMetadataCache.artists}->0->>'credit_name'`,
      mbMetadataCache.name
    )
    .limit(limitNumber)
    .offset(offset);

  // Get total count for pagination
  const totalQuery = useDrizzle()
    .select({
      count: sql<number>`count(*)`
    })
    .from(mbMetadataCache);

  const [rawSongs, [{ count: total }]] = await Promise.all([
    query.execute(),
    totalQuery.execute()
  ]);

  const songs = rawSongs.map((song) => song as RecordingIndex);
  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const response = {
    songs,
    pagination
  };

  return response;
});
