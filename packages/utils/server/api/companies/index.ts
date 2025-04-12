import { useDataCache } from '#nuxt-multi-cache/composables';
import { db } from '@serp/utils/server/api/db';
import {
  companyCache,
  companyCategoryCache
} from '@serp/utils/server/api/db/schema';
import { asc, desc, eq, sql } from 'drizzle-orm';

import type { CompanyIndex, Pagination } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug } = getQuery(event);
  const cacheKey = `companies-${categorySlug}-${page}-${limit}`;
  const { value, addToCache } = await useDataCache(cacheKey, event);
  if (value) {
    return value;
  }

  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);

  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Page must be a positive integer.'
    });
  }

  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Limit must be a positive integer.'
    });
  }

  const offset = (pageNumber - 1) * limitNumber;

  let baseQuery = db
    .select({
      id: companyCache.id,
      name: companyCache.name,
      slug: companyCache.slug,
      oneLiner: companyCache.oneLiner,
      excerpt: companyCache.excerpt,
      logo: companyCache.logo,
      serplyLink: companyCache.serplyLink,
      categories: companyCache.categories,
      screenshots: companyCache.screenshots,
      rating: companyCache.rating,
      upvotes: companyCache.upvotes,
      downvotes: companyCache.downvotes,
      featured: companyCache.featured,
      featuredOrder: companyCache.featuredOrder
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
  baseQuery = baseQuery
    .orderBy(desc(companyCache.featured), asc(companyCache.featuredOrder))
    .limit(limitNumber)
    .offset(offset);

  let totalQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(companyCache);

  if (categorySlug) {
    totalQuery = totalQuery.where(
      sql`
        jsonb_path_exists(
          ${companyCache.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
      `
    );
  }

  const categoryQuery = db
    .select({
      id: companyCategoryCache.id,
      name: companyCategoryCache.name,
      slug: companyCategoryCache.slug,
      buyersGuide: companyCategoryCache.buyersGuide,
      faqs: companyCategoryCache.faqs
    })
    .from(companyCategoryCache)
    .where(eq(companyCategoryCache.slug, categorySlug));

  const [results, [{ count: total }], categoryResults] = await Promise.all([
    baseQuery.execute(),
    totalQuery.execute(),
    categoryQuery.execute()
  ]);

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    });
  }

  const companies = results.map((company) => {
    return company as CompanyIndex;
  });

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const category = categoryResults.length ? categoryResults[0] : null;

  const response = {
    companies,
    pagination,
    category
  };
  addToCache(response, [], 60 * 60 * 10); // 10 hours
  return response;
});
