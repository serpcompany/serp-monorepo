import { faker } from '@faker-js/faker';
import type { Company } from '~/types/Company';

const generateCompany = (slug: string): Company => {
  const name = faker.company.name();
  return {
    id: faker.number.int(),
    name,
    slug,
    oneLiner: faker.company.catchPhrase(),
    excerpt: faker.lorem.paragraph(),
    logo: 'https://placehold.co/250x250',
    screenshots: [
      'https://placehold.co/500x500',
      'https://placehold.co/500x500',
      'https://placehold.co/500x500',
      'https://placehold.co/500x500'
    ],
    serplyLink: faker.internet.url(),
    article: faker.lorem.paragraphs(7),
    features: Array.from({ length: 5 }, () => ({
      id: faker.number.int(),
      item: faker.commerce.productName(),
      description: faker.lorem.sentence()
    })),
    faqs: Array.from({ length: 3 }, () => ({
      question: faker.lorem.sentence(),
      answer: faker.lorem.paragraph()
    })),
    alternatives: [faker.company.name(), faker.company.name()],
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    }))
  };
};

// Mock database
const mockDb = new Map<string, Company>();

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  // Get or generate company data
  let company = mockDb.get(slug);
  if (!company) {
    company = generateCompany(slug);
    mockDb.set(slug, company);
  }

  return company;
});
