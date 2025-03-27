import { useDrizzle } from '../../db';
import { companyCategoryCache } from '../../db/schema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default defineEventHandler(async (event) => {
  const companyCategories = await useDrizzle()
    .select({ slug: companyCategoryCache.slug })
    .from(companyCategoryCache)
    .execute();

  const response = companyCategories.map(
    (companyCategory) => `/products/best/${companyCategory.slug}/`
  );

  return response;
});
