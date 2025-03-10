import { useDrizzle } from '../db';
import { postCache } from '../db/schema';
import { sql, eq, and } from 'drizzle-orm';

import type { PostIndex, Pagination } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug, module = '' } = getQuery(event);

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
  const whereConditions = [];

  let baseQuery = useDrizzle()
    .select({
      id: postCache.id,
      title: postCache.title,
      slug: postCache.slug,
      excerpt: postCache.excerpt,
      featuredImage: postCache.featuredImage,
      categories: postCache.categories,
      createdAt: postCache.createdAt,
      author: postCache.author,
      module: postCache.module,
      keyword: postCache.keyword
    })
    .from(postCache);

  if (categorySlug) {
    whereConditions.push(
      sql`
          jsonb_path_exists(
            ${postCache.categories},
         '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${categorySlug}::text)
        )
        `
    );
  }

  if (module) {
    whereConditions.push(eq(postCache.module, module));
  }

  baseQuery = baseQuery
    .orderBy(postCache.title)
    .limit(limitNumber)
    .offset(offset);

  let totalQuery = useDrizzle()
    .select({ count: sql<number>`count(*)` })
    .from(postCache);

  if (whereConditions.length > 0) {
    baseQuery = baseQuery.where(and(...whereConditions));
    totalQuery = totalQuery.where(and(...whereConditions));
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

  const posts = results.map((post) => {
    return post as PostIndex;
  });

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const getCategoryName = () => {
    if (posts && posts.length && posts[0].categories) {
      for (const category of posts[0].categories) {
        if (category.slug === categorySlug) {
          return category.name;
        }
      }
      return undefined;
    }
  };
  const categoryName = getCategoryName();

  const response = {
    posts,
    pagination,
    categoryName
  };
  return response;
});
