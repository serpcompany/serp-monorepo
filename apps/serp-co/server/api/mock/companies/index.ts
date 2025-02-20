import { faker } from '@faker-js/faker';
import type { CompanyIndex, Pagination } from '@serp/types/types';

const generateCompany = (): CompanyIndex => {
  const name = faker.company.name();
  return {
    id: faker.number.int(),
    name,
    slug: faker.helpers.slugify(name),
    screenshots: Array.from({ length: 3 }, () => faker.image.urlLoremFlickr()),
    oneLiner: faker.lorem.words(13),
    excerpt: faker.lorem.sentences(12),
    rating: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
    upvotes: faker.number.int({ min: 0, max: 1000 }),
    downvotes: faker.number.int({ min: 0, max: 1000 }),
    logo: 'https://imagedelivery.net/lnCkkCGRx34u0qGwzZrUBQ/f364fd53-6e3b-4156-1c32-2d1540384f00/width=200,height=200,fit=pad',
    serplyLink: faker.internet.url(),
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    }))
  };
};

// Mock database with a fixed set of companies
const TOTAL_MOCK_ITEMS = 500;
const mockDb = Array.from({ length: TOTAL_MOCK_ITEMS }, generateCompany).sort(
  (a, b) => a.name.localeCompare(b.name)
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
  const companies = mockDb.slice(offset, offset + limitNumber);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: TOTAL_MOCK_ITEMS
  };

  const categoryArticle = `
  <h2>Buyers Guide: How to Choose & Email Marketing Software</h2>
  <p>Understanding different company categories is crucial for business planning and market analysis.</p>

  <h3>Types of Business Structures</h3>
  <p>Companies can be classified into various structures, from sole proprietorships to corporations, each with distinct legal and financial implications. Choosing the right structure impacts taxation, liability, and operational flexibility.</p>

  <h3>Industry Classifications</h3>
  <p>Standard industrial classification systems help categorize companies by their primary business activities. These classifications are essential for market research, regulatory compliance, and competitive analysis.</p>

  <h3>Size Categories</h3>
  <p>Organizations are often grouped by size metrics such as revenue, employee count, or market capitalization. Small and medium enterprises (SMEs) operate differently from large corporations and multinationals.</p>

  <h3>Market Positioning</h3>
  <p>Companies position themselves in different market segments, from budget-friendly to premium offerings. Understanding market positioning helps identify competitors and target customer segments effectively.</p>

  <h3>Ownership Models</h3>
  <p>Business ownership structures range from private companies to publicly traded corporations. Each model has specific requirements for governance, reporting, and stakeholder management.</p>
  `;

  const categoryName = faker.lorem.words(2);

  return {
    companies,
    pagination,
    categoryName: categorySlug ? categoryName : null,
    categoryArticle: categorySlug ? categoryArticle : null
  };
});
