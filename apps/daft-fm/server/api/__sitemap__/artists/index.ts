import { db } from '@/server/db';
import { mbArtistMetadataCache } from '@/server/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const cacheKey = `artist-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const post = await db
    .select({
      slug: mbArtistMetadataCache.slug
    })
    .from(mbArtistMetadataCache)
    .execute();

  const response = post.map((post_) => `/artists/${post_.slug}/`);

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
