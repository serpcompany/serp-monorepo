import { db } from '@serp/utils/server/api/db';
import { mbReleaseGroupCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const cacheKey = `album-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const post = await db
    .select({
      slug: mbReleaseGroupCache.slug
    })
    .from(mbReleaseGroupCache)
    .execute();

  const response = post.map((post_) => `/albums/${post_.slug}/`);

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
