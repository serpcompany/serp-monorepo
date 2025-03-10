import { useDrizzle } from '../db';
import { companyCache } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { Company } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  const query = useDrizzle()
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
  return company;
});
