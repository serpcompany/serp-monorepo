import { faker } from '@faker-js/faker';
import type {
  ReleaseGroup,
  ArtistCredit,
  ArtistRelation,
  ReleaseGroupRecording,
  UrlRelation,
  EventRelation,
  ReleaseGroupRelation,
  SeriesRelation,
  Wikidata,
  CoverArt
} from '@serp/types/types';

// Helper functions
const generateSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

const generateArtistCredit = (index: number, total: number): ArtistCredit => {
  const artistName = faker.person.fullName();
  return {
    creditName: artistName,
    joinPhrase: index === total - 1 ? '' : ' & ',
    slug: generateSlug(artistName)
  };
};

const generateCoverArt = (): CoverArt => ({
  250: faker.image.urlLoremFlickr({
    width: 250,
    height: 250,
    category: 'album'
  }),
  500: faker.image.urlLoremFlickr({
    width: 500,
    height: 500,
    category: 'album'
  })
});

const generateArtistRelations = (): ArtistRelation[] => {
  return Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => {
    const artistName = faker.person.fullName();
    return {
      type: faker.helpers.arrayElement([
        'performer',
        'producer',
        'composer',
        'conductor'
      ]),
      artistName,
      artistSlug: generateSlug(artistName),
      ...(Math.random() > 0.7 && {
        instrument: faker.helpers.arrayElement([
          'orchestra',
          'ensemble',
          'band'
        ])
      })
    };
  });
};

const generateUrlRelations = (): UrlRelation[] => {
  return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
    type: faker.helpers.arrayElement(['streaming', 'purchase', 'official']),
    url: faker.internet.url()
  }));
};

const generateEventRelations = (): EventRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const eventName = `${faker.company.name()} Festival ${faker.number.int({ min: 2000, max: 2024 })}`;
    return {
      type: 'recorded at',
      eventName,
      eventSlug: generateSlug(eventName)
    };
  });
};

const generateReleaseGroupRelations = (): ReleaseGroupRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const releaseGroupName = faker.music.songName();
    return {
      type: faker.helpers.arrayElement([
        'compilation of',
        'remixed as',
        'remastered as'
      ]),
      releaseGroupName,
      releaseGroupSlug: generateSlug(releaseGroupName)
    };
  });
};

const generateSeriesRelations = (): SeriesRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 1 }) }, () => {
    const seriesName = `${faker.company.name()} Collection`;
    return {
      type: 'series',
      seriesName,
      seriesSlug: generateSlug(seriesName)
    };
  });
};

const generateWikidata = (): Wikidata => {
  const title = faker.music.songName();
  return {
    title,
    aliases: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.music.songName()
    ),
    properties: {
      genre: faker.music.genre(),
      released: faker.date.past().getFullYear().toString(),
      recordLabel: faker.company.name(),
      language: faker.helpers.arrayElement([
        'English',
        'Spanish',
        'French',
        'Japanese'
      ])
    },
    description: faker.lorem.paragraph(),
    serpWikiUrl: `https://wikipedia.org/wiki/${generateSlug(title)}`,
    wikipediaUrl: `https://wikipedia.org/wiki/${generateSlug(title)}`
  };
};

const generateRecording = (position: number): ReleaseGroupRecording => {
  const songName = faker.music.songName();
  const numArtists = Math.random() > 0.85 ? 2 : 1;

  return {
    name: songName,
    position,
    slug: generateSlug(songName),
    length: faker.number.int({ min: 120000, max: 300000 }), // 2-5 minutes in milliseconds
    artists: Array.from({ length: numArtists }, (_, i) =>
      generateArtistCredit(i, numArtists)
    ),
    hasLyrics: faker.datatype.boolean()
  };
};

const generateRecordings = (): ReleaseGroupRecording[] => {
  return Array.from(
    { length: faker.number.int({ min: 8, max: 15 }) },
    (_, index) => generateRecording(index + 1)
  );
};

const generateReleaseGroup = (slug: string): ReleaseGroup => {
  const albumName = faker.music.songName();
  const numArtists = Math.random() > 0.85 ? 2 : 1;

  return {
    name: albumName,
    slug,
    seoTitle: `${albumName} by ${faker.person.fullName()}`,
    seoDescription: faker.lorem.sentence(),
    type: faker.helpers.arrayElement(['Album', 'EP', 'Single']),
    secondaryTypes:
      Math.random() > 0.7
        ? [
            faker.helpers.arrayElement([
              'Live',
              'Compilation',
              'Soundtrack',
              'Remix'
            ])
          ]
        : null,
    date: faker.date.past().toISOString().split('T')[0],
    coverArt: generateCoverArt(),
    tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
      faker.music.genre()
    ),
    genres: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.music.genre()
    ),
    artists: Array.from({ length: numArtists }, (_, i) =>
      generateArtistCredit(i, numArtists)
    ),
    recordings: generateRecordings(),
    artistRels: generateArtistRelations(),
    urlRels: generateUrlRelations(),
    eventRels: generateEventRelations(),
    releaseGroupRels: generateReleaseGroupRelations(),
    releaseGroupReverseRels: generateReleaseGroupRelations(),
    seriesRels: generateSeriesRelations(),
    wikidata: Math.random() > 0.3 ? generateWikidata() : null,
    overview: faker.lorem.paragraphs(3)
  };
};

// Mock database
const mockDb = new Map<string, ReleaseGroup>();

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  // Get or generate album data
  let album = mockDb.get(slug);
  if (!album) {
    album = generateReleaseGroup(slug);
    mockDb.set(slug, album); // Cache for consistency
  }

  return album;
});
