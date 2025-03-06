import { db } from '@serp/utils/server/api/db';
import { boxerCache } from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

import type { Boxer } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const cacheKey = `boxer-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(boxerCache).where(eq(boxerCache.slug, slug));

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Boxer not found'
    });
  }

  const boxer = results[0] as Boxer;
  const response = boxer;

  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
