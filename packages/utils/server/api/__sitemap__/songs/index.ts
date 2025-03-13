import { db } from '@serp/utils/server/api/db';
import { mbMetadataCache } from '@serp/utils/server/api/db/schema';
import { sql } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const { page, count = false } = getQuery(event);
  const limit = 50000;
  const cacheKey = `songs-sitemap-${page}-${count}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  if (count) {
    const totalItems = await db
      .select({ count: sql<number>`count(*)` })
      .from(mbMetadataCache)
      .execute();

    const totalPages = Math.ceil(Number(totalItems[0].count) / limit);
    addToCache(totalPages, [], 60 * 60 * 10); // 10 hours
    return totalPages;
  }

  const posts = await db
    .select({
      slug: mbMetadataCache.slug
    })
    .from(mbMetadataCache)
    .limit(limit)
    .offset(limit * (Number(page) - 1))
    .execute();

  const response = posts.map((post) => `${post.slug}/`);

  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
