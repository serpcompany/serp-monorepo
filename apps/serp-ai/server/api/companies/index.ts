import { db } from '@/server/db';
import { companyCache } from '@/server/db/schema';
import { sql } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

import type {
  CompanyIndex,
  RawCompanyIndex,
  Category,
  RawCategory,
  Pagination
} from '@serp/types/types';

const transformCategory = (category: RawCategory): Category => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});

const transformCompany = (company: RawCompanyIndex): CompanyIndex => ({
  id: company.id,
  name: company.name,
  slug: company.slug,
  oneLiner: company.oneLiner,
  excerpt: company.excerpt,
  logo: company.logo,
  serplyLink: company.serplyLink,
  categories: company.categories?.map(transformCategory),
  screenshots: company.screenshots,
  rating: company.rating,
  upvotes: company.upvotes,
  downvotes: company.downvotes,
  featured: company.featured,
  featuredOrder: company.featuredOrder
});

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
    .orderBy(companyCache.name)
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

  const [results, [{ count: total }]] = await Promise.all([
    baseQuery.execute(),
    totalQuery.execute()
  ]);

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    });
  }

  const companies = results.map(transformCompany);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const getCategoryName = () => {
    if (companies && companies.length && companies[0].categories) {
      for (const category of companies[0].categories) {
        if (category.slug === categorySlug) {
          return category.name;
        }
      }
      return undefined;
    }
  };
  const categoryName = getCategoryName();

  const response = {
    companies,
    pagination,
    categoryName
  };
  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
