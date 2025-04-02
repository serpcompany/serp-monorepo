import { db } from '@serp/utils/server/api/db';
import { companyCache } from '@serp/utils/server/api/db/schema';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { categorySlug } = getQuery(event);

  let baseQuery = db
    .select({
      id: companyCache.id,
      domain: companyCache.domain
    })
    .from(companyCache);

  if (categorySlug) {
    baseQuery = baseQuery.where(
      sql`
        jsonb_path_exists(
          ${companyCache.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }

  const results = await baseQuery.execute();

  return results.length ? results : [];
});
