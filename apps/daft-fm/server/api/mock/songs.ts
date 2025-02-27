import { faker } from '@faker-js/faker';
import type {
  RecordingIndex,
  ArtistCredit,
  ReleaseGroupBase,
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
    joinPhrase: index === total - 1 ? '' : ' & ',
    slug: generateSlug(artistName)
  };
};

// Generate a fake release group
const generateReleaseGroup = (): ReleaseGroupBase | null => {
  if (Math.random() > 0.7) return null;

  const albumName = faker.music.songName();
  return {
    name: albumName,
    slug: generateSlug(albumName)
  };
};

// Generate a fake recording/song
const generateRecording = (): RecordingIndex => {
  const songName = faker.music.songName();
  const numArtists = Math.random() > 0.85 ? 2 : 1;

  return {
    name: songName,
    slug: generateSlug(songName),
    artists: Array.from({ length: numArtists }, (_, index) =>
      generateArtistCredit(index, numArtists)
    ),
    releaseGroup: generateReleaseGroup()
  };
};

// Mock database with a fixed set of recordings
const TOTAL_MOCK_ITEMS = 500;
const mockDb = Array.from({ length: TOTAL_MOCK_ITEMS }, generateRecording).sort(
  (a, b) => {
    const artistCompare = a.artists[0].creditName.localeCompare(
      b.artists[0].creditName
    );
    if (artistCompare !== 0) return artistCompare;
    return a.name.localeCompare(b.name);
  }
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
  const songs = mockDb.slice(offset, offset + limitNumber);

  const pagination: Pagination = {
    currentPage: pageNumber,
    pageSize: limitNumber,
    totalItems: TOTAL_MOCK_ITEMS
  };

  return {
    songs,
    pagination
  };
});
