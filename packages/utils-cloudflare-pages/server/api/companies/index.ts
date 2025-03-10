import { useDrizzle } from '../db';
import { companyCache } from '../db/schema';
import { sql, asc, desc } from 'drizzle-orm';
import type { CompanyIndex, Pagination } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug } = getQuery(event);

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

  let baseQuery = useDrizzle()
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

  let totalQuery = useDrizzle()
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

  const companies = results.map((company) => company as CompanyIndex);

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

  return response;
});
