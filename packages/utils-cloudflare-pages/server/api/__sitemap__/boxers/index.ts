import { useDrizzle } from '../../db';
import { boxerCache } from '../../db/schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default defineEventHandler(async (event) => {
  const boxers = await useDrizzle()
    .select({ slug: boxerCache.slug })
    .from(boxerCache)
    .execute();

  const response = boxers.map((boxer) => `/boxers/${boxer.slug}/`);
  return response;
});
