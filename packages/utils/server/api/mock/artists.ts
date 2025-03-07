import { faker } from '@faker-js/faker';
import type { ArtistBase, Pagination } from '@serp/types/types';

// Helper to generate a slug from a string
const generateSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Generate a fake artist
const generateArtist = (): ArtistBase => {
  const artistName = faker.person.fullName();
  return {
    name: artistName,
    slug: generateSlug(artistName)
  };
};

// Mock database with a fixed set of artists
const TOTAL_MOCK_ITEMS = 500;
const mockDb = Array.from({ length: TOTAL_MOCK_ITEMS }, generateArtist).sort(
  (a, b) => a.name.localeCompare(b.name)
);

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 100 } = getQuery(event);

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
  const artists = mockDb.slice(offset, offset + limitNumber);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: TOTAL_MOCK_ITEMS
  };

  return {
    artists,
    pagination
  };
});
