import { useDrizzle } from '../../db';
import { companyCache } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const companies = await useDrizzle()
    .select({ slug: companyCache.slug })
    .from(companyCache)
    .execute();

  const response = companies.map(
    (company) => `/products/${company.slug}/reviews/`
  );

  return response;
});
