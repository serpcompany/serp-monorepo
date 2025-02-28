import { db } from '@serp/utils/server/api/db';
import { companyCache } from '@serp/utils/server/api/db/schema';
import { eq } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

import type { Company } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  const cacheKey = `company-${slug}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const query = db
    .select()
    .from(companyCache)
    .where(eq(companyCache.slug, slug as string));

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Company not found'
    });
  }

  const company = results[0] as Company;
  const response = company;

  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
