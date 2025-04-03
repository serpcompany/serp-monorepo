import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyCategoryCache,
  companyFeaturedSubscription
} from '@serp/utils/server/api/db/schema';
import { and, eq, isNull, sql } from 'drizzle-orm';

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

  // get available placements for the category (1-5)
  const usedPlacementsAndDomains = await db
    .select({
      placement: companyFeaturedSubscription.placement,
      domain: companyCache.domain
    })
    .from(companyFeaturedSubscription)
    .leftJoin(
      companyCategoryCache,
      eq(companyCategoryCache.id, companyFeaturedSubscription.categoryFk)
    )
    .innerJoin(
      companyCache,
      eq(companyCache.id, companyFeaturedSubscription.companyFk)
    )
    .where(
      and(
        eq(companyFeaturedSubscription.isActive, true),
        categorySlug
          ? eq(companyCategoryCache.slug, categorySlug)
          : isNull(companyCategoryCache.slug)
      )
    )
    .execute();
  const usedPlacementsSet = new Set(
    usedPlacementsAndDomains.map((item) => item.placement)
  );
  const availablePlacements = [];
  for (let i = 1; i <= 5; i++) {
    if (!usedPlacementsSet.has(i)) {
      availablePlacements.push(i);
    }
  }

  // get all companies for the category (remove companies with an active subscription for the category)
  const companies = results.length ? results : [];
  const usedDomains = usedPlacementsAndDomains.map((item) => item.domain);
  for (const domain of usedDomains) {
    const index = companies.findIndex((item) => item.domain === domain);
    if (index !== -1) {
      companies.splice(index, 1);
    }
  }

  return {
    companies,
    availablePlacements
  };
});
