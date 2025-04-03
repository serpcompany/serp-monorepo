import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyCategoryCache,
  companyFeaturedSubscription
} from '@serp/utils/server/api/db/schema';
import { and, eq, isNull, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { placement, domain, categorySlug } = getQuery(event);

  if (!placement || !domain) {
    throw new Error(
      'Both "placement" and "domain" are required query parameters.'
    );
  }

  const placementNum = Number(placement);
  if (isNaN(placementNum) || placementNum < 1 || placementNum > 5) {
    // placement must be between 1 and 5
    return { available: false };
  }

  // Check if the company exists and, if categorySlug is provided, that it has the proper category
  let companyQuery = db
    .select({
      id: companyCache.id,
      domain: companyCache.domain,
      categories: companyCache.categories
    })
    .from(companyCache)
    .where(eq(companyCache.domain, domain));

  if (categorySlug) {
    companyQuery = companyQuery.where(
      sql`
        jsonb_path_exists(
          ${companyCache.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }

  const companyRecords = await companyQuery.execute();
  if (!companyRecords.length) {
    // Domain isn't eligible if it doesn't exist or doesn't have the given category
    return { available: false };
  }

  // Check if the domain is already featured in this category
  const domainUsedQuery = db
    .select({ id: companyFeaturedSubscription.id })
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
        eq(companyCache.domain, domain),
        categorySlug
          ? eq(companyCategoryCache.slug, categorySlug)
          : isNull(companyCategoryCache.slug)
      )
    );

  const domainUsed = await domainUsedQuery.execute();
  if (domainUsed.length) {
    // Domain already has an active featured subscription in this category
    return { available: false };
  }

  // Check if the requested placement is already taken in this category
  const placementUsedQuery = db
    .select({ id: companyFeaturedSubscription.id })
    .from(companyFeaturedSubscription)
    .leftJoin(
      companyCategoryCache,
      eq(companyCategoryCache.id, companyFeaturedSubscription.categoryFk)
    )
    .where(
      and(
        eq(companyFeaturedSubscription.isActive, true),
        eq(companyFeaturedSubscription.placement, placementNum),
        categorySlug
          ? eq(companyCategoryCache.slug, categorySlug)
          : isNull(companyCategoryCache.slug)
      )
    );

  const placementUsed = await placementUsedQuery.execute();
  if (placementUsed.length) {
    // The placement is already in use in this category
    return { available: false };
  }

  // Passed all checks—placement is available for the given domain and category.
  return { available: true };
});
