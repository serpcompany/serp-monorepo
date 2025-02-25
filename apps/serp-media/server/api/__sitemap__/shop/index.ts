import { db } from '@/server/db';
import { postCache } from '@/server/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const cacheKey = `shop-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const post = await db
    .select({
      slug: postCache.slug
    })
    .from(postCache)
    .where(eq(postCache.module, 'shop'))
    .execute();

  const response = post.map((post_) => `/shop/best/${post_.slug}/`);

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
