import { db } from '@serp/utils/server/api/db';
import { boxerCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const cacheKey = `boxers-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const boxers = await db
    .select({
      slug: boxerCache.slug
    })
    .from(boxerCache)
    .execute();

  const response = boxers.map((boxer) => `/boxers/${boxer.slug}/`);

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
