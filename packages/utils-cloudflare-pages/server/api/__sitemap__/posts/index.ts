import { db } from '@serp/utils/server/api/db';
import { postCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const cacheKey = `post-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const post = await db
    .select({
      slug: postCache.slug
    })
    .from(postCache)
    .execute();

  const response = post.map((post_) => `/posts/${post_.slug}/`);

  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
