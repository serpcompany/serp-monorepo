import { db } from '@serp/utils/server/api/db';
import { postCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { page, count = false } = getQuery(event);
  const limit = 50000;
  const cacheKey = `shop-sitemap-${page}-${count}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  if (count) {
    const totalItems = await db
      .select({ count: sql<number>`count(*)` })
      .from(postCache)
      .where(eq(postCache.module, 'shop'))
      .execute();

    const totalPages = Math.ceil(Number(totalItems[0].count) / limit);

    addToCache(totalPages, [], 60 * 60 * 24 * 7); // 1 week
    return totalPages;
  }

  const post = await db
    .select({
      slug: postCache.slug
    })
    .from(postCache)
    .where(eq(postCache.module, 'shop'))
    .limit(limit)
    .offset(limit * (Number(page) - 1))
    .execute();

  const response = post.map(
    (post_) => `/shop/best/${encodeURIComponent(post_.slug)}/`
  );

  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
