import { db } from '@/server/db';
import { postCategoryCache } from '@/server/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';
import type { Category, RawCategory } from '@serp/types/types';

const transformCategory = (category: RawCategory): Category => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});

export default defineEventHandler(async (event) => {
  const cacheKey = 'post-categories';
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(postCategoryCache);

  const results = await query.execute();

  const categories = results.map(transformCategory);

  const response = categories;
  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
