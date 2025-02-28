import { db } from '@serp/utils/server/api/db';
import { weightClassCache } from '@serp/utils/server/api/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';
import type { WeightClass } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const cacheKey = 'weight-classes';
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db.select().from(weightClassCache);

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    });
  }

  const weightClasses = results.map((weightClass) => {
    return weightClass as WeightClass;
  });

  const response = weightClasses;
  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
