import { db } from '@serp/utils/server/api/db';
import { postCache } from '@serp/utils/server/api/db/schema';
import { eq, and } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

import type { Post } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const { module } = getQuery(event);
  const cacheKey = `post-${slug}-${module}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const whereConditions = [eq(postCache.slug, slug as string)];
  if (module) {
    whereConditions.push(eq(postCache.module, module));
  }

  const query = db
    .select()
    .from(postCache)
    .where(and(...whereConditions));

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Post not found'
    });
  }

  const post = results[0] as Post;
  const response = post;

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
