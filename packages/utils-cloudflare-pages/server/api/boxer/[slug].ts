import { useDrizzle } from '../db';
import { boxerCache } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { Boxer } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  const query = useDrizzle()
    .select()
    .from(boxerCache)
    .where(eq(boxerCache.slug, slug));

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Boxer not found'
    });
  }

  const boxer = results[0] as Boxer;
  return boxer;
});
