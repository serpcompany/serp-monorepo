import { db } from '@serp/utils/server/api/db';
import { companyCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';

export default defineEventHandler(async (event) => {
  const cacheKey = `company-sitemap`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const companies = await db
    .select({
      slug: companyCache.slug
    })
    .from(companyCache)
    .execute();

  const response = companies.map(
    (company) => `/products/${company.slug}/reviews/`
  );

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
