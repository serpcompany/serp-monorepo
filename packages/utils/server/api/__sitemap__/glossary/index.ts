import { db } from '@serp/utils/server/api/db';
import { postCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const cacheKey = `glossary-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const post = await db
    .select({
      slug: postCache.slug
    })
    .from(postCache)
    .where(eq(postCache.module, 'Glossary'))
    .execute();

  const response = post.map((post_) => `/posts/${post_.slug}/`);

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
