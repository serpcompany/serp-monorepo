import { faker } from '@faker-js/faker';
import type { Post } from '@serp/types/types';

const generatePost = (slug: string): Post => {
  const title = faker.lorem.sentence();
  return {
    id: faker.number.int(),
    title,
    slug,
    content: faker.lorem.paragraphs(3),
    categories: Array.from(
      { length: faker.number.int({ min: 1, max: 3 }) },
      () => {
        const catName = faker.lorem.word();
        return {
          id: faker.number.int(),
          name: catName,
          slug: faker.helpers.slugify(catName)
        };
      }
    )
  };
};

const mockDb = new Map<string, Post>();

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  let post = mockDb.get(slug);
  if (!post) {
    post = generatePost(slug);
    mockDb.set(slug, post);
  }

  return post;
});
