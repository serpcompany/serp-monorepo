import { db } from '@serp/utils/server/api/db';
import { companyCategoryCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const cacheKey = `company-categories-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const companyCategories = await db
    .select({
      slug: companyCategoryCache.slug
    })
    .from(companyCategoryCache)
    .execute();

  const response = companyCategories.map(
    (companyCategory) => `/products/best/${companyCategory.slug}/`
  );

  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
