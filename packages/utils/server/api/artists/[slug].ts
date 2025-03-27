import { useDataCache } from '#nuxt-multi-cache/composables';
import type { Artist } from '@serp/types/types';
import { db } from '@serp/utils/server/api/db';
import { mbArtistMetadataCache } from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const slug = decodeURIComponent(getRouterParam(event, 'slug'));

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  const cacheKey = `artist-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db
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
  addToCache(artist, [], 60 * 60 * 24 * 7); // 1 week
  return artist;
});
