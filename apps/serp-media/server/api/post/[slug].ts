import { db } from '@/server/db';
import { postCache } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

import type { Category, RawCategory, Post, RawPost } from '@serp/types/types';

const transformCategory = (category: RawCategory): Category => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});

const transformPost = (post: RawPost): Post => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  content: post.content,
  categories: post.categories?.map(transformCategory)
});

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const { module } = getQuery(event);
  const cacheKey = `post-${slug}-${module}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(postCache).where(
    and(eq(postCache.slug, slug), eq(postCache.module, module))
  );

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Post not found'
    });
  }

  const post = transformPost(results[0]);
  const response = post;

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
