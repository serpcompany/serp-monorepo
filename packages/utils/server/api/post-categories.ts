import { db } from '@serp/utils/server/api/db';
import { postCategoryCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';
import type { Category } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const cacheKey = 'post-categories';
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(postCategoryCache);

  const results = await query.execute();

  const categories = results.map((cat) => {
    return cat as Category;
  });

  const response = categories;
  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
