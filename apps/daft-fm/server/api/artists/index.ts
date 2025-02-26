import { db } from '@/server/db';
import { mbArtistMetadataCache } from '@/server/db/schema';
import { sql } from 'drizzle-orm';
import type { ArtistBase, Pagination, RawArtistBase } from '@serp/types/types';

const transformArtist = (record: RawArtistBase): ArtistBase => ({
  name: record.name,
  slug: record.slug
});

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100 } = getQuery(event);

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

  // Modify the query to include limit and offset
  const query = db
    .select({
      name: mbArtistMetadataCache.name,
      slug: mbArtistMetadataCache.slug
    })
    .from(mbArtistMetadataCache)
    .orderBy(mbArtistMetadataCache.name)
    .limit(limitNumber)
    .offset(offset);

  // Get total count for pagination
  const totalQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(mbArtistMetadataCache);

  const [rawArtists, [{ count: total }]] = await Promise.all([
    query.execute(),
    totalQuery.execute()
  ]);

  const artists = rawArtists.map(transformArtist);
  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const response = {
    artists,
    pagination
  };

  return response;
});
