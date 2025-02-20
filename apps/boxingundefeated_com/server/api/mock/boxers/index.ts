import { faker } from '@faker-js/faker';
import type { BoxerIndex, Pagination } from '@/types';

const weightClasses = [
  { name: 'Bantamweight', slug: 'bantamweight' },
  { name: 'Cruiserweight', slug: 'cruiserweight' },
  { name: 'Featherweight', slug: 'featherweight' },
  { name: 'Flyweight', slug: 'flyweight' },
  { name: 'Heavyweight', slug: 'heavyweight' },
  { name: 'Light Flyweight', slug: 'light-flyweight' },
  { name: 'Light Heavyweight', slug: 'light-heavyweight' },
  { name: 'Lightweight', slug: 'lightweight' },
  { name: 'Middleweight', slug: 'middleweight' },
  { name: 'Minimumweight', slug: 'minimumweight' },
  { name: 'Super Bantamweight', slug: 'super-bantamweight' },
  { name: 'Super Featherweight', slug: 'super-featherweight' },
  { name: 'Super Flyweight', slug: 'super-flyweight' },
  { name: 'Super Lightweight', slug: 'super-lightweight' },
  { name: 'Super Middleweight', slug: 'super-middleweight' },
  { name: 'Super Welterweight', slug: 'super-welterweight' },
  { name: 'Welterweight', slug: 'welterweight' }
];

const generateBoxer = (): BoxerIndex => {
  const name = faker.person.fullName();
  // Pick a random weight class from our fixed list
  const randomDivision = faker.helpers.arrayElement(weightClasses);
  return {
    id: faker.number.int(),
    name,
    slug: faker.helpers.slugify(name),
    division: randomDivision
  };
};

const TOTAL_MOCK_ITEMS = 500;
const mockDb: BoxerIndex[] = Array.from(
  { length: TOTAL_MOCK_ITEMS },
  generateBoxer
).sort((a, b) => a.name.localeCompare(b.name));

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100, weightClassSlug = '' } = getQuery(event);

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

  // Filter boxers by weightClassSlug if provided
  let filteredBoxers = mockDb;
  if (weightClassSlug) {
    filteredBoxers = mockDb.filter(
      (boxer) => boxer.division.slug === weightClassSlug
    );
  }

  const totalItems = filteredBoxers.length;
  if (totalItems === 0) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    });
  }

  const offset = (pageNumber - 1) * limitNumber;
  const boxers = filteredBoxers.slice(offset, offset + limitNumber);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: totalItems
  };

  return {
    boxers,
    pagination
  };
});
