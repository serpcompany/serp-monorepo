import { eq } from 'drizzle-orm';
import { useDrizzle } from '../db';
import { postIndexCache } from '../db/schema';

import type { PostIndex } from '@serp/types/types';

/**
 * Format date to human-readable format
 */
const formatDate = (
  dateString: string | null | undefined
): string | undefined => {
  if (!dateString) return undefined;

  try {
    const date = new Date(dateString);
    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return dateString;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error formatting date: ${error.message}`);
    return dateString;
  }
};

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
      data: postIndexCache.data
    })
    .from(postIndexCache)
    .where(eq(postIndexCache.key, key))
    .execute();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    });
  }

  // Parse the stored JSON string into a proper object
  const parsedData = JSON.parse(results[0].data);
  const parsedPosts = parsedData.posts.map((post: PostIndex) => {
    let parsedCategories = [];
    try {
      if (post.categories) {
        if (typeof post.categories === 'string') {
          parsedCategories = JSON.parse(post.categories);
        } else if (Array.isArray(post.categories)) {
          parsedCategories = post.categories;
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Error parsing categories for post ${post.id}: ${error.message}`
      );
    }

    return {
      ...post,
      categories: parsedCategories,
      createdAt: formatDate(post.createdAt),
      updatedAt: formatDate(post.updatedAt)
    };
  });

  // Return the properly structured response
  return {
    posts: parsedPosts,
    pagination: parsedData.pagination,
    categoryName: parsedData.categoryName
  };
});
