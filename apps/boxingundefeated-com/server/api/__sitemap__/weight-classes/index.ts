import { db } from '@/server/db';
import { weightClassCache } from '@/server/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const cacheKey = `weight-classes-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const weightClasses = await db
    .select({
      slug: weightClassCache.slug
    })
    .from(weightClassCache)
    .execute();

  const response = weightClasses.map(
    (weightClass) => `/boxers/division/${weightClass.slug}/`
  );

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
