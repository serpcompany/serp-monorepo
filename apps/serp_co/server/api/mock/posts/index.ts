import { faker } from '@faker-js/faker';
import type { PostIndex, Pagination } from '@/types';

const generatePost = (): PostIndex => {
  const title = faker.lorem.sentence();
  return {
    id: faker.number.int(),
    title,
    slug: faker.helpers.slugify(title),
    excerpt: faker.lorem.sentences(2),
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    })),
    createdAt: faker.date.past().toISOString(),
    author: faker.person.fullName(),
    image:
      'https://raw.githubusercontent.com/serpcompany/serp-ipsum/refs/heads/main/images/devin-schumacher-grumpy-cat.png',
    oneLiner: faker.lorem.sentence(),
    module: faker.helpers.arrayElement(['blog', 'glossary'])
  };
};

// Mock database with a fixed set of posts
const TOTAL_MOCK_ITEMS = 500;
const mockDb = Array.from({ length: TOTAL_MOCK_ITEMS }, generatePost).sort(
  (a, b) => a.title.localeCompare(b.title)
);

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100, categorySlug = '' } = getQuery(event);

  // Convert and validate pagination parameters
  const pageNumber = Number(page);
  const limitNumber = Math.min(Number(limit), 100);

  // Validate numbers are positive integers
  if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Page must be a positive integer'
    });
  }

  if (isNaN(limitNumber) || limitNumber < 1 || !Number.isInteger(limitNumber)) {
    throw createError({
      statusCode: 400,
      message: 'Limit must be a positive integer'
    });
  }

  // Calculate offset for pagination
  const offset = (pageNumber - 1) * limitNumber;

  // Get paginated slice of data
  const posts = mockDb.slice(offset, offset + limitNumber);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: TOTAL_MOCK_ITEMS
  };

  const categoryName = categorySlug ? faker.lorem.words(2) : null;

  return {
    posts,
    pagination,
    categoryName
  };
});
