import { useDrizzle } from '../db';
import { mbReleaseGroupCache } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { ReleaseGroup } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  const query = useDrizzle()
    .select()
    .from(mbReleaseGroupCache)
    .where(eq(mbReleaseGroupCache.slug, slug))
    .limit(1);

  const results = await query.execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Album not found'
    });
  }

  const album = results[0] as ReleaseGroup;
  return album;
});
