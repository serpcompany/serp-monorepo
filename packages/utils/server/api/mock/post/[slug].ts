import { faker } from '@faker-js/faker';
import type { Post, PostIndex } from '@serp/types/types';

const generatePostIndex = (slug: string): PostIndex => {
  const title = faker.lorem.words(5);
  return {
    id: faker.number.int(),
    title,
    slug,
    excerpt: faker.lorem.sentence(),
    author: faker.person.fullName(),
    createdAt: faker.date.recent().toISOString(),
    image: 'https://placehold.co/250x250',
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    })),
    oneLiner: faker.lorem.sentence(),
    module: faker.helpers.arrayElement(['blog', 'glossary'])
  };
};

const generatePost = (slug: string): Post => {
  const title = faker.lorem.words(5);
  return {
    id: faker.number.int(),
    title,
    slug,
    excerpt: faker.lorem.sentence(),
    author: faker.person.fullName(),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    image: 'https://placehold.co/250x250',
    content: faker.lorem.paragraphs(7),
    categories: Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      name: faker.commerce.department(),
      slug: faker.helpers.slugify(faker.commerce.department())
    })),
    oneLiner: faker.lorem.sentence(),
    videoId: 'r2py_Z-bMuY',
    relatedPosts: Array.from({ length: 10 }, generatePostIndex),
    module: faker.helpers.arrayElement(['blog', 'glossary'])
  };
};

// Mock database
const mockDb = new Map<string, Post>();

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  // Get or generate post data
  let post = mockDb.get(slug);
  if (!post) {
    post = generatePost(slug);
    mockDb.set(slug, post);
  }

  return post;
});
