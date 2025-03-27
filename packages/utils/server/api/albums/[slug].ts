import { useDataCache } from '#nuxt-multi-cache/composables';
import type { ReleaseGroup } from '@serp/types/types';
import { db } from '@serp/utils/server/api/db';
import { mbReleaseGroupCache } from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const slug = decodeURIComponent(getRouterParam(event, 'slug'));

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  const cacheKey = `album-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db
    .select()
    .from(mbReleaseGroupCache)
    .where(eq(mbReleaseGroupCache.slug, slug))
    .limit(1);

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Album not found'
    });
  }

  const album = results[0] as ReleaseGroup;
  addToCache(album, [], 60 * 60 * 24 * 7); // 1 week
  return album;
});
