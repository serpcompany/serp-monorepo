import { useDrizzle } from '../../db';
import { mbMetadataCache } from '../../db/schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default defineEventHandler(async (event) => {
  const posts = await useDrizzle()
    .select({ slug: mbMetadataCache.slug })
    .from(mbMetadataCache)
    .execute();

  const response = posts.map((post_) => `/songs/${post_.slug}/`);
  return response;
});
