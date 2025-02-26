import { db } from '@/server/db';
import { mbReleaseGroupCache } from '@/server/db/schema';
import { sql } from 'drizzle-orm';
import type {
  ArtistCredit,
  ReleaseGroupBase,
  Pagination,
  RawArtistCredit,
  RawReleaseGroupBase
} from '@serp/types/types';

const transformArtistCredit = (artist: RawArtistCredit): ArtistCredit => ({
  creditName: artist.credit_name,
  joinPhrase: artist.join_phrase,
  slug: artist.slug
});

const transformReleaseGroup = (
  record: RawReleaseGroupBase
): ReleaseGroupBase => ({
  name: record.name,
  slug: record.slug,
  artists: record.artists.map(transformArtistCredit)
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

  const query = db
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
  const totalQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(mbReleaseGroupCache);

  const [rawAlbums, [{ count: total }]] = await Promise.all([
    query.execute(),
    totalQuery.execute()
  ]);

  const albums = rawAlbums.map(transformReleaseGroup);
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
