import { useDrizzle } from '../../db';
import { postCache } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const posts = await useDrizzle()
    .select({
      slug: postCache.slug
    })
    .from(postCache)
    .where(eq(postCache.module, 'Blog'))
    .execute();

  const response = posts.map((post_) => `/posts/${post_.slug}/`);
  return response;
});
