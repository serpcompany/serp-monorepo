import { faker } from '@faker-js/faker';
import type {
  Artist,
  ArtistReleaseGroup,
  ArtistCredit,
  ReleaseGroupRecording,
  CoverArt,
  UrlRelation,
  ArtistRelation,
  EventRelation,
  LabelRelation,
  PlaceRelation,
  SeriesRelation,
  Wikidata
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

const generateUrlRelations = (): UrlRelation[] => {
  return Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
    type: faker.helpers.arrayElement([
      'official homepage',
      'social media',
      'streaming',
      'fansite'
    ]),
    url: faker.internet.url()
  }));
};

const generateArtistRelations = (): ArtistRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 4 }) }, () => {
    const artistName = faker.person.fullName();
    return {
      type: faker.helpers.arrayElement([
        'member of',
        'collaborated with',
        'influenced by',
        'teacher of'
      ]),
      artistName,
      artistSlug: generateSlug(artistName),
      ...(Math.random() > 0.7 && {
        instrument: faker.helpers.arrayElement([
          'vocals',
          'guitar',
          'piano',
          'drums'
        ])
      })
    };
  });
};

const generateEventRelations = (): EventRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => {
    const eventName = `${faker.company.name()} Festival ${faker.number.int({ min: 2000, max: 2024 })}`;
    return {
      type: 'performed at',
      eventName,
      eventSlug: generateSlug(eventName)
    };
  });
};

const generateLabelRelations = (): LabelRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const labelName = faker.company.name();
    return {
      type: faker.helpers.arrayElement(['signed to', 'founded']),
      labelName,
      labelSlug: generateSlug(labelName)
    };
  });
};

const generatePlaceRelations = (): PlaceRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const placeName = `${faker.company.name()} ${faker.helpers.arrayElement(['Arena', 'Hall', 'Theater'])}`;
    return {
      type: 'performed at',
      placeName,
      placeSlug: generateSlug(placeName)
    };
  });
};

const generateSeriesRelations = (): SeriesRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 1 }) }, () => {
    const seriesName = `${faker.person.lastName()} ${faker.helpers.arrayElement(['Tour', 'Concert Series', 'Festival'])}`;
    return {
      type: 'series',
      seriesName,
      seriesSlug: generateSlug(seriesName)
    };
  });
};

const generateWikidata = (artistName: string): Wikidata => {
  return {
    title: artistName,
    aliases: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.helpers.arrayElement([
        `${artistName} ${faker.person.lastName()}`,
        `DJ ${artistName}`,
        `${artistName} and the ${faker.commerce.productName()}s`
      ])
    ),
    properties: {
      birthName: faker.person.fullName(),
      occupation: faker.helpers.arrayElement([
        'Singer',
        'Musician',
        'Composer',
        'Producer'
      ]),
      instrument: faker.helpers.arrayElement([
        'Guitar',
        'Piano',
        'Vocals',
        'Drums'
      ]),
      genre: faker.music.genre()
    },
    description: faker.lorem.paragraph(),
    serpWikiUrl: `https://wikipedia.org/wiki/${generateSlug(artistName)}`,
    wikipediaUrl: `https://wikipedia.org/wiki/${generateSlug(artistName)}`
  };
};

const generateReleaseGroup = (mainArtistName: string): ArtistReleaseGroup => {
  const albumName = faker.music.songName();
  const numArtists = Math.random() > 0.85 ? 2 : 1;
  const trackCount = faker.number.int({ min: 8, max: 15 });

  return {
    name: albumName,
    slug: generateSlug(albumName),
    artists: [
      {
        creditName: mainArtistName,
        joinPhrase: numArtists > 1 ? ' & ' : '',
        slug: generateSlug(mainArtistName)
      },
      ...(numArtists > 1
        ? [
            {
              creditName: faker.person.fullName(),
              joinPhrase: '',
              slug: generateSlug(faker.person.fullName())
            }
          ]
        : [])
    ],
    date: faker.date.past().toISOString().split('T')[0],
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
    coverArt: generateCoverArt(),
    recordings: Array.from({ length: trackCount }, (_, index) =>
      generateRecording(index + 1)
    )
  };
};

const generateArtist = (slug: string): Artist => {
  const artistName = faker.person.fullName();
  const startYear = faker.number.int({ min: 1950, max: 2010 });
  const isActive = Math.random() > 0.2;
  const releaseGroupCount = faker.number.int({ min: 3, max: 10 });

  return {
    name: artistName,
    slug,
    seoTitle: `${artistName} - Artist Information, Discography, and More`,
    seoDescription: faker.lorem.sentence(),
    beginDate: `${startYear}-${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0')}-${faker.number.int({ min: 1, max: 28 }).toString().padStart(2, '0')}`,
    endDate: isActive
      ? null
      : `${faker.number.int({ min: startYear + 5, max: 2024 })}-${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0')}-${faker.number.int({ min: 1, max: 28 }).toString().padStart(2, '0')}`,
    artistType: faker.helpers.arrayElement([
      'Person',
      'Group',
      'Orchestra',
      'Choir'
    ]),
    gender:
      Math.random() > 0.5
        ? faker.helpers.arrayElement(['Male', 'Female', 'Other'])
        : null,
    area: faker.location.country(),
    beginArea: faker.location.city(),
    endArea: isActive ? null : faker.location.city(),
    tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
      faker.music.genre()
    ),
    genres: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.music.genre()
    ),
    releaseGroups: Array.from({ length: releaseGroupCount }, () =>
      generateReleaseGroup(artistName)
    ).sort(
      (a, b) =>
        new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
    ),
    urlRels: generateUrlRelations(),
    artistRels: generateArtistRelations(),
    artistReverseRels: generateArtistRelations(),
    eventRels: generateEventRelations(),
    labelRels: generateLabelRelations(),
    placeRels: generatePlaceRelations(),
    seriesRels: generateSeriesRelations(),
    wikidata: Math.random() > 0.2 ? generateWikidata(artistName) : null,
    overview: faker.lorem.paragraphs(3)
  };
};

// Mock database
const mockDb = new Map<string, Artist>();

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  // Get or generate artist data
  let artist = mockDb.get(slug);
  if (!artist) {
    artist = generateArtist(slug);
    mockDb.set(slug, artist); // Cache for consistency
  }

  return artist;
});
