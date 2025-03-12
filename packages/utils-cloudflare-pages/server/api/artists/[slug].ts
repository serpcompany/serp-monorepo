import { useDrizzle } from '../db';
import { mbArtistMetadataCache } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { Artist } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  const query = useDrizzle()
    .select()
    .from(mbArtistMetadataCache)
    .where(eq(mbArtistMetadataCache.slug, slug))
    .limit(1);

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Artist not found'
    });
  }

  const artist = results[0] as Artist;
  return artist;
});
