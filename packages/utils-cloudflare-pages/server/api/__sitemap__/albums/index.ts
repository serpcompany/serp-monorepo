import { useDrizzle } from '../../db';
import { mbReleaseGroupCache } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const posts = await useDrizzle()
    .select({
      slug: mbReleaseGroupCache.slug
    })
    .from(mbReleaseGroupCache)
    .execute();

  const response = posts.map((post_) => `/albums/${post_.slug}/`);
  return response;
});
