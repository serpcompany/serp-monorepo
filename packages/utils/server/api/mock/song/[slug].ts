import { faker } from '@faker-js/faker';
import type {
  Recording,
  RecordingReleaseGroup,
  ArtistCredit,
  ArtistRelation,
  UrlRelation,
  AreaRelation,
  WorkRelation,
  WorkUrlRelation,
  RecordingRelation,
  SeriesRelation,
  EventRelation,
  LabelRelation,
  PlaceRelation,
  Wikidata,
  CoverArt,
  LyricsAnnotation,
  LyricsSync
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
        'lyricist'
      ]),
      artistName,
      artistSlug: generateSlug(artistName),
      ...(Math.random() > 0.7 && {
        instrument: faker.helpers.arrayElement([
          'guitar',
          'piano',
          'drums',
          'bass'
        ])
      })
    };
  });
};

const generateUrlRelations = (): UrlRelation[] => {
  return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
    type: faker.helpers.arrayElement(['streaming', 'social media', 'official']),
    url: faker.internet.url()
  }));
};

const generateWorkRelations = (): WorkRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const workName = faker.music.songName();
    return {
      type: faker.helpers.arrayElement(['composition', 'arrangement']),
      workName,
      workSlug: generateSlug(workName)
    };
  });
};

const generateWorkUrlRelations = (): WorkUrlRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => ({
    type: faker.helpers.arrayElement(['score', 'libretto']),
    url: faker.internet.url()
  }));
};

const generateRecordingRelations = (): RecordingRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const recordingName = faker.music.songName();
    return {
      type: faker.helpers.arrayElement(['cover', 'remix']),
      recordingName,
      recordingSlug: generateSlug(recordingName)
    };
  });
};

const generateReverseRecordingRelations = (): RecordingRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const recordingName = faker.music.songName();
    return {
      type: faker.helpers.arrayElement(['cover of', 'sample of']),
      recordingName,
      recordingSlug: generateSlug(recordingName)
    };
  });
};

const generateSeriesRelations = (): SeriesRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 1 }) }, () => {
    const seriesName = faker.company.name();
    return {
      type: 'series',
      seriesName,
      seriesSlug: generateSlug(seriesName)
    };
  });
};

const generateAreaRelations = (): AreaRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const areaName = faker.location.country();
    return {
      type: faker.helpers.arrayElement(['recorded in', 'written in']),
      areaName,
      areaSlug: generateSlug(areaName)
    };
  });
};

const generateEventRelations = (): EventRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const eventName = `${faker.company.name()} Festival ${faker.number.int({ min: 2000, max: 2024 })}`;
    return {
      type: 'performed at',
      eventName,
      eventSlug: generateSlug(eventName)
    };
  });
};

const generateLabelRelations = (): LabelRelation[] => {
  return Array.from({ length: faker.number.int({ min: 1, max: 2 }) }, () => {
    const labelName = faker.company.name();
    return {
      type: 'label',
      labelName,
      labelSlug: generateSlug(labelName)
    };
  });
};

const generatePlaceRelations = (): PlaceRelation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => {
    const placeName = `${faker.company.name()} Studio`;
    return {
      type: 'recorded at',
      placeName,
      placeSlug: generateSlug(placeName)
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

const generateDetailedReleaseGroup = (): RecordingReleaseGroup => {
  const albumName = faker.music.songName();
  const numArtists = Math.random() > 0.85 ? 2 : 1;

  return {
    name: albumName,
    slug: generateSlug(albumName),
    artists: Array.from({ length: numArtists }, (_, i) =>
      generateArtistCredit(i, numArtists)
    ),
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
    coverArt: generateCoverArt()
  };
};

const generateLyrics = (): string => {
  const verses = faker.number.int({ min: 2, max: 4 });
  let lyrics = '';
  for (let i = 0; i < verses; i++) {
    lyrics += Array.from({ length: 4 }, () => faker.lorem.sentence()).join(
      '\n'
    );
    lyrics += '\n\n';
  }
  return lyrics
    .trim()
    .split('\n')
    .map((line) => (line.trim() ? `<p>${line}</p>` : '<br>'))
    .join('');
};

const generateLyricsAnnotations = (): LyricsAnnotation[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
    source: faker.company.name(),
    content: faker.lorem.paragraph(),
    verified: Math.random() > 0.5,
    votes: faker.number.int({ min: 0, max: 100 })
  }));
};

const generateLyricsSync = (): LyricsSync[] => {
  return Array.from(
    { length: faker.number.int({ min: 10, max: 20 }) },
    (_, index) => ({
      startTime: index * 3000,
      endTime: index * 3000 + 2800,
      words: faker.lorem.words(3),
      sequence: index
    })
  );
};

const generateDetailedRecording = (slug: string): Recording => {
  const songName = faker.music.songName();
  const numArtists = Math.random() > 0.85 ? 2 : 1;
  const hasReleaseGroup = Math.random() > 0.3;
  const releaseGroup = hasReleaseGroup ? generateDetailedReleaseGroup() : null;

  return {
    name: songName,
    slug,
    seoTitle: `${songName} by ${faker.person.fullName()} - Song Lyrics and Information`,
    seoDescription: faker.lorem.sentence(),
    length: faker.number.int({ min: 120000, max: 300000 }), // 2-5 minutes in milliseconds
    tags: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
      faker.music.genre()
    ),
    genres: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.music.genre()
    ),
    releaseGroupSlug: releaseGroup?.slug || null,
    releaseGroup,
    artists: Array.from({ length: numArtists }, (_, i) =>
      generateArtistCredit(i, numArtists)
    ),
    artistRels: generateArtistRelations(),
    urlRels: generateUrlRelations(),
    workRels: generateWorkRelations(),
    workUrlRels: generateWorkUrlRelations(),
    recordingRels: generateRecordingRelations(),
    recordingReverseRels: generateReverseRecordingRelations(),
    seriesRels: generateSeriesRelations(),
    areaRels: generateAreaRelations(),
    eventRels: generateEventRelations(),
    labelRels: generateLabelRelations(),
    placeRels: generatePlaceRelations(),
    wikidata: Math.random() > 0.3 ? generateWikidata() : null,
    workWikidata: Math.random() > 0.7 ? generateWikidata() : null,
    lyrics: generateLyrics(),
    lyricsAnnotations: generateLyricsAnnotations(),
    lyricsSync: Math.random() > 0.7 ? generateLyricsSync() : null,
    overview: faker.lorem.paragraphs(3)
  };
};

// Mock database
const mockDb = new Map<string, Recording>();

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug parameter is required'
    });
  }

  // Get or generate song data
  let song = mockDb.get(slug);
  if (!song) {
    song = generateDetailedRecording(slug);
    mockDb.set(slug, song); // Cache for consistency
  }

  return song;
});
