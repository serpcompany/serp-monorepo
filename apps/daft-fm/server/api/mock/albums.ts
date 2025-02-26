import { faker } from '@faker-js/faker';
import type {
  ReleaseGroupBase,
  ArtistCredit,
  Pagination
} from '@serp/types/types';

// Helper to generate a slug from a string
const generateSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Generate a fake artist credit
const generateArtistCredit = (index: number, total: number): ArtistCredit => {
  const artistName = faker.person.fullName();
  return {
    creditName: artistName,
    joinPhrase: index === total - 1 ? '' : ' & ', // Empty string for last artist, ' & ' for others
    slug: generateSlug(artistName)
  };
};

// Generate a fake release group
const generateReleaseGroup = (): ReleaseGroupBase => {
  const albumName = faker.music.songName();
  const numArtists = Math.random() > 0.9 ? 2 : 1; // 10% chance of having 2 artists

  return {
    name: albumName,
    slug: generateSlug(albumName),
    artists: Array.from({ length: numArtists }, (_, index) =>
      generateArtistCredit(index, numArtists)
    )
  };
};

// Mock database with a fixed set of release groups
const TOTAL_MOCK_ITEMS = 500;
const mockDb = Array.from(
  { length: TOTAL_MOCK_ITEMS },
  generateReleaseGroup
).sort((a, b) =>
  a.artists[0].creditName.localeCompare(b.artists[0].creditName)
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
  const albums = mockDb.slice(offset, offset + limitNumber);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: TOTAL_MOCK_ITEMS
  };

  return {
    albums,
    pagination
  };
});
