import { useDrizzle } from '../db';
import { weightClassCache } from '../db/schema';
import type { WeightClass } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const query = useDrizzle().select().from(weightClassCache);

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    });
  }

  const weightClasses = results.map((weightClass) => weightClass as WeightClass);

  const response = weightClasses;
  return response;
});
