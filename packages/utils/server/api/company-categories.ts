import { db } from '@serp/utils/server/api/db';
import { companyCategoryCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';
import type { Category } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const cacheKey = 'company-categories';
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(companyCategoryCache);

  const results = await query.execute();

  const categories = results.map((cat) => {
    return cat as Category;
  });

  const response = categories;
  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
