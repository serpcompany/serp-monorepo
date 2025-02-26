import { db } from '@/server/db';
import { mbMetadataCache } from '@/server/db/schema';
import { sql } from 'drizzle-orm';
import type {
  RecordingIndex,
  ArtistCredit,
  ReleaseGroupBase,
  Pagination,
  RawArtistCredit,
  RawReleaseGroupBase,
  RawRecordingIndex
} from '@serp/types/types';

const transformArtistCredit = (artist: RawArtistCredit): ArtistCredit => ({
  creditName: artist.credit_name,
  joinPhrase: artist.join_phrase,
  slug: artist.slug
});

const transformReleaseGroup = (
  releaseGroup: RawReleaseGroupBase
): ReleaseGroupBase | null => {
  if (!releaseGroup) return null;
  return {
    name: releaseGroup.name,
    slug: releaseGroup.slug
  };
};

const transformRecording = (record: RawRecordingIndex): RecordingIndex => ({
  name: record.name,
  slug: record.slug,
  artists: record.artists.map(transformArtistCredit),
  releaseGroup: transformReleaseGroup(record.releaseGroup)
});

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

  const songs = rawSongs.map(transformRecording);
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
