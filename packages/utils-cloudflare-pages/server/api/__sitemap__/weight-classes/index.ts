import { useDrizzle } from '../../db';
import { weightClassCache } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const weightClasses = await useDrizzle()
    .select({ slug: weightClassCache.slug })
    .from(weightClassCache)
    .execute();

  const response = weightClasses.map(
    (weightClass) => `/boxers/division/${weightClass.slug}/`
  );

  return response;
});
