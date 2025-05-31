import { useDataCache } from '#nuxt-multi-cache/composables';
import { getDb } from '@serp/db/server/database';
import { topic } from '@serp/db/server/database/schema';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { page, count = false } = getQuery(event);
  const limit = 50000;
  const module = getRouterParam(event, 'module');
  const cacheKey = `${module}-topic-sitemap-${page}-${count}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  if (count) {
    const totalItems = await getDb()
      .select({ count: sql<number>`count(*)` })
      .from(topic)
      .where(eq(topic.module, module))
      .execute();

    const totalPages = Math.ceil(Number(totalItems[0].count) / limit);
    addToCache(totalPages, [], 60 * 60 * 10); // 10 hours
    return totalPages;
  }

  const topics = await getDb()
    .select({
      slug: topic.slug
    })
    .from(topic)
    .where(eq(topic.module, module))
    .limit(limit)
    .offset(limit * (Number(page) - 1))
    .execute();

  const response = topics.map(
    (topic_: { slug: string }) => `${encodeURIComponent(topic_.slug)}/`
  );

  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
