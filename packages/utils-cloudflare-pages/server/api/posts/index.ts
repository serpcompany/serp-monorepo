import { useDrizzle } from '../db';
import { postIndexCache } from '../db/schema';
import { eq } from 'drizzle-orm';

import type { PostIndex, Pagination } from '@serp/types/types';

export default defineEventHandler(async (event) => {
  const { page = 1, categorySlug, module = '' } = getQuery(event);

  const pageNumber = Number(page);

  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Page must be a positive integer.'
    });
  }

  let key = '';
  if (module && categorySlug) {
    key = `${module}-${categorySlug}-${pageNumber}`;
  } else if (module) {
    key = `${module}-${pageNumber}`;
  } else if (categorySlug) {
    key = `${categorySlug}-${pageNumber}`;
  } else {
    key = `all-${pageNumber}`;
  }

  const results = await useDrizzle()
    .select({
      data: postIndexCache.data,
    })
    .from(postIndexCache).where(eq(postIndexCache.key, key)).execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    });
  }

  const posts = results.data.post((post) => {
    return post as PostIndex;
  });

  const pagination = results.data.pagination as Pagination;

  const categoryName = results.data.categoryName as string;

  const response = {
    posts,
    pagination,
    categoryName
  };
  return response;
});
