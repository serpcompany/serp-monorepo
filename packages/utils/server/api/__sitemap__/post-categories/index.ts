import { db } from '@serp/utils/server/api/db';
import { postCategoryCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const cacheKey = `post-categories-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const postCategories = await db
    .select({
      slug: postCategoryCache.slug
    })
    .from(postCategoryCache)
    .execute();

  const response = postCategories.map(
    (postCategory) => `/posts/category/${postCategory.slug}/`
  );

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
