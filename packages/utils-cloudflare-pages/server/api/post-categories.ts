import type { Category } from '@serp/types/types';
import { useDrizzle } from './db';
import { postCategoryCache } from './db/schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default defineEventHandler(async (event) => {
  const query = useDrizzle().select().from(postCategoryCache);

  const results = await query.execute();

  const categories = results.map((cat) => cat as Category);

  return categories;
});
