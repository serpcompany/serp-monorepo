import { faker } from '@faker-js/faker';
import type { PostIndex, Pagination } from '@serp/types/types';

const predefinedCategories = [
  { id: 1, name: 'Shop', slug: 'shop' },
  { id: 2, name: 'Movies', slug: 'movies' }
];

const generatePost = (): PostIndex => {
  const title = faker.lorem.sentence();
  const numCategories = faker.number.int({ min: 1, max: 2 });
  const categories = faker.helpers
    .shuffle(predefinedCategories)
    .slice(0, numCategories);

  return {
    id: faker.number.int(),
    title,
    slug: faker.helpers.slugify(title),
    categories
  };
};

const TOTAL_MOCK_ITEMS = 500;
const mockDb: PostIndex[] = Array.from(
  { length: TOTAL_MOCK_ITEMS },
  generatePost
).sort((a, b) => a.title.localeCompare(b.title));

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug = '' } = getQuery(event);
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

  let filteredPosts = mockDb;
  if (categorySlug) {
    filteredPosts = filteredPosts.filter((post) =>
      post.categories?.some((category) => category.slug === categorySlug)
    );
  }

  const totalItems = filteredPosts.length;
  if (totalItems === 0) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    });
  }

  const offset = (pageNumber - 1) * limitNumber;
  const posts = filteredPosts.slice(offset, offset + limitNumber);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems
  };

  return {
    posts,
    pagination
  };
});
