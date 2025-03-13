import { db } from '@serp/utils/server/api/db';
import { mbMetadataCache } from '@serp/utils/server/api/db/schema';
import { sql } from 'drizzle-orm';
import type { RecordingIndex, Pagination } from '@serp/types/types';
import { useDataCache } from '#nuxt-multi-cache/composables';

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

  const cacheKey = `songs-${pageNumber}-${limitNumber}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  // Calculate offset for pagination
  const offset = (pageNumber - 1) * limitNumber;

  // Modify the query to include limit and offset
  const query = db
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
  const totalQuery = db
    .select({
      count: sql<number>`count(*)`
    })
    .from(mbMetadataCache);

  const [rawSongs, [{ count: total }]] = await Promise.all([
    query.execute(),
    totalQuery.execute()
  ]);

  const songs = rawSongs.map((song) => {
    return song as RecordingIndex;
  });
  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const response = {
    songs,
    pagination
  };
  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
