import { useDataCache } from '#nuxt-multi-cache/composables';
import { db } from '@serp/utils/server/api/db';
import { mbArtistMetadataCache } from '@serp/utils/server/api/db/schema';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { page, count = false } = getQuery(event);
  const limit = 50000;
  const cacheKey = `artists-sitemap-${page}-${count}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  if (count) {
    const totalItems = await db
      .select({ count: sql<number>`count(*)` })
      .from(mbArtistMetadataCache)
      .execute();

    const totalPages = Math.ceil(Number(totalItems[0].count) / limit);

    addToCache(totalPages, [], 60 * 60 * 10); // 10 hours
    return totalPages;
  }

  const post = await db
    .select({
      slug: mbArtistMetadataCache.slug
    })
    .from(mbArtistMetadataCache)
    .limit(limit)
    .offset(limit * (Number(page) - 1))
    .execute();

  const response = post.map(
    (post_: { slug: string }) => `${encodeURIComponent(post_.slug)}/`
  );

  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
