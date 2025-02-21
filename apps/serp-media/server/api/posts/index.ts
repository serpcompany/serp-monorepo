import { db } from '@/server/db';
import { postCache } from '@/server/db/schema';
import { sql, eq, and } from 'drizzle-orm';
import { useDataCache } from '#nuxt-multi-cache/composables';

import type {
  PostIndex,
  RawPostIndex,
  Category,
  RawCategory,
  Pagination
} from '@serp/types/types';

const transformCategory = (category: RawCategory): Category => ({
  id: category.id,
  name: category.name,
  slug: category.slug
});

const transformPost = (post: RawPostIndex): PostIndex => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  categories: post.categories?.map(transformCategory)
});

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug, module } = getQuery(event);
  const cacheKey = `posts-${categorySlug}-${page}-${limit}-${module}`;
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
  const whereConditions = [];

  let baseQuery = db
    .select({
      id: postCache.id,
      title: postCache.title,
      slug: postCache.slug,
      categories: postCache.categories,
      module: postCache.module
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

  let totalQuery = db.select({ count: sql<number>`count(*)` }).from(postCache);

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

  const posts = results.map(transformPost);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: Number(total)
  };

  const response = {
    posts,
    pagination
  };
  addToCache(response, [], 60 * 60 * 24 * 7); // 1 week
  return response;
});
