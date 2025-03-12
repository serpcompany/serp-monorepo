import { useDrizzle } from '../../db';
import { postCache } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const posts = await useDrizzle()
    .select({ slug: postCache.slug })
    .from(postCache)
    .execute();

  const response = posts.map((post_) => `/posts/${post_.slug}/`);
  return response;
});
