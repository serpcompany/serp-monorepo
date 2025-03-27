import { useDrizzle } from '../../db';
import { mbArtistMetadataCache } from '../../db/schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default defineEventHandler(async (event) => {
  const posts = await useDrizzle()
    .select({ slug: mbArtistMetadataCache.slug })
    .from(mbArtistMetadataCache)
    .execute();

  const response = posts.map((post_) => `/artists/${post_.slug}/`);
  return response;
});
