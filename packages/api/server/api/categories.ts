import { useDataCache } from '#nuxt-multi-cache/composables';
import { getDb } from '@serp/db/server/database';
import { category } from '@serp/db/server/database/schema';
import type { Category } from '@serp/types/types';
import { eq, and, inArray } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { module = '', slugs = '' } = getQuery(event);
  const slugList = slugs ? String(slugs).split(',').filter(Boolean).sort() : [];
  const cacheKey = `categories-${module}-${slugList.join(',')}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  let query = getDb().select().from(category);

  // Build where conditions
  const whereConditions = [eq(category.module, module)];
  if (slugList.length > 0) {
    whereConditions.push(inArray(category.slug, slugList));
  }

  query = query.where(and(...whereConditions));

  const results = await query.execute();

  const categories = results.map((cat) => {
    return cat as Category;
  });

  const response = categories;
  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
