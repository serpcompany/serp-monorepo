import { useDrizzle } from '../db';
import { postCache } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import type { Post } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const { module } = getQuery(event);

  const whereConditions = [eq(postCache.slug, slug as string)];
  if (module) {
    whereConditions.push(eq(postCache.module, module));
  }

  const query = useDrizzle()
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
  post.comments = post.comments.map((comment) => typeof comment === 'string' ? JSON.parse(comment) : comment);

  return post;
});
