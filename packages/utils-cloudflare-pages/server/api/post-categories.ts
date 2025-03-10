import { useDrizzle } from './db';
import { postCategoryCache } from './db/schema';
import type { Category } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const query = useDrizzle().select().from(postCategoryCache);

  const results = await query.execute();

  const categories = results.map((cat) => cat as Category);

  return categories;
});
