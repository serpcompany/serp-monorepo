import { useDataCache } from '#nuxt-multi-cache/composables';
import { db } from '@serp/utils/server/api/db';
import { postCache } from '@serp/utils/server/api/db/schema';
import { sql } from 'drizzle-orm';

 
export default defineEventHandler(async (event) => {
  // Extract page and count from query parameters
  const { page, count = false } = getQuery(event);
  // Set your pagination limit (adjust as needed)
  const limit = 50000;
  const cacheKey = `post-sitemap-${page}-${count}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  // When count flag is true, return the total number of pages
  if (count) {
    const totalItems = await db
      .select({ count: sql<number>`count(*)` })
      .from(postCache)
      .execute();
    const totalPages = Math.ceil(Number(totalItems[0].count) / limit);
    addToCache(totalPages, [], 60 * 60 * 10); // cache for 1 week
    return totalPages;
  }

  // Fetch the posts for the requested page
  const posts = await db
    .select({
      slug: postCache.slug
    })
    .from(postCache)
    .limit(limit)
    .offset(limit * (Number(page) - 1))
    .execute();

  const response = posts.map((post_) => `/posts/${post_.slug}/`);

  addToCache(response, [], 60 * 60 * 10); // cache for 10 hours
  return response;
});
