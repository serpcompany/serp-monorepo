import { useDrizzle } from '../../db';
import { postCache } from '../../db/schema';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { page, count = false } = getQuery(event);
  const limit = 50000;

  if (count) {
    const totalItems = await useDrizzle()
      .select({ count: sql<number>`count(*)` })
      .from(postCache)
      .where(eq(postCache.module, 'shop'))
      .execute();

    const totalPages = Math.ceil(Number(totalItems[0].count) / limit);
    return totalPages;
  }

  const post = await useDrizzle()
    .select({ slug: postCache.slug })
    .from(postCache)
    .where(eq(postCache.module, 'shop'))
    .limit(limit)
    .offset(limit * (Number(page) - 1))
    .execute();

  const response = post.map((post_) => `/shop/best/${encodeURIComponent(post_.slug)}/`);
  return response;
});
