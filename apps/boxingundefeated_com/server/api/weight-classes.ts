import { db } from '@/server/db';
import { weightClassCache } from '@/server/db/schema';
import { useDataCache } from '#nuxt-multi-cache/composables';
import type { WeightClass, RawWeightClass } from '@/types';

const transformWeightClass = (weightClass: RawWeightClass): WeightClass => ({
  id: weightClass.id,
  name: weightClass.name,
  slug: weightClass.slug
});

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

  const weightClasses = results.map(transformWeightClass);

  const response = weightClasses;
  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
