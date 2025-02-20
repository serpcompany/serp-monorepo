import { db } from '@/server/db';
import { postCache } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

import type { Post, RawPost, Category, RawCategory } from '@/types';

const transformCategory = (category: RawCategory): Category => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});

const transformPost = (post: RawPost): Post => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  image: post.featuredImage,
  categories: post.categories?.map(transformCategory),
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  author: post.author,
  content: post.content,
  videoId: post.videoId,
  oneLiner: post.oneLiner,
  relatedPosts: post.relatedPosts,
  module: post.module
});

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const cacheKey = `post-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(postCache).where(eq(postCache.slug, slug));

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
