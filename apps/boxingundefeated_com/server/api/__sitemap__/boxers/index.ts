import { db } from '@/server/db';
import { boxerCache } from '@/server/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const cacheKey = `post-sitemap`;
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
