import { useDrizzle } from '../db';
import { companyCategoryCache } from '../db/schema';
import type { Category } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const query = useDrizzle().select().from(companyCategoryCache);

  const results = await query.execute();

  const categories = results.map((cat) => cat as Category);

  return categories;
});
