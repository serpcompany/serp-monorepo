import { useDrizzle } from '../../db';
import { boxerCache } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const boxers = await useDrizzle()
    .select({ slug: boxerCache.slug })
    .from(boxerCache)
    .execute();

  const response = boxers.map((boxer) => `/boxers/${boxer.slug}/`);
  return response;
});
