import { faker } from '@faker-js/faker';
import type { Boxer } from '@/types';

const generateBoxer = (slug: string): Boxer => {
  const name = faker.person.fullName();
  return {
    id: faker.number.int(),
    name,
    slug,
    birthName: faker.person.fullName(),
    career: faker.lorem.sentence(),
    debut: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement(['active', 'retired']),
    gender: faker.helpers.arrayElement(['male', 'female']),
    nationality: faker.location.country(),
    residence: faker.location.city(),
    nicknames: [faker.word.adjective(), faker.word.adjective()],
    stance: faker.helpers.arrayElement(['orthodox', 'southpaw']),
    birthPlace: faker.location.city(),
    heightCm: faker.number.int({ min: 160, max: 210 }),
    reachCm: faker.number.int({ min: 160, max: 210 }),
    division: {
      name: faker.word.words(2),
      slug: faker.helpers.slugify(faker.word.words(2))
    },
    content: faker.lorem.paragraphs(3),
    numWins: faker.number.int({ min: 0, max: 100 }),
    numDraws: faker.number.int({ min: 0, max: 50 }),
    numLosses: faker.number.int({ min: 0, max: 50 }),
    bouts: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      () => ({
        date: faker.date.past().toISOString(),
        opponent: {
          name: faker.person.fullName(),
          slug: faker.helpers.slugify(faker.person.fullName())
        },
        result: faker.helpers.arrayElement(['win', 'loss', 'draw']),
        location: faker.location.city()
      })
    )
  };
};

// Simple in-memory mock database for storing generated boxers
const mockDb = new Map<string, Boxer>();

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  let boxer = mockDb.get(slug);
  if (!boxer) {
    boxer = generateBoxer(slug);
    mockDb.set(slug, boxer);
  }

  return boxer;
});
