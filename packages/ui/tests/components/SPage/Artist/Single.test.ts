import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SPageArtistSingle from '../../../../components/SPage/Artist/Single.vue';
import ComponentRender from '../../../componentRender';
import '../../../mockUseUserSession';

mockNuxtImport('useSeoMeta', () => () => {});

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: false,
  },
};

let artistData_: unknown = {};
let upvotesData_: unknown = { upvotes: [] };

mockNuxtImport('useRuntimeConfig', () => () => config_);
mockNuxtImport('useArtist', () => () => artistData_);
mockNuxtImport('useFetchWithCache', () => () => upvotesData_);

const scenarios: [
  string,
  { config: Record<string, unknown>; artist: unknown; upvotes: string[] },
][] = [
  [
    'complete artist with upvotes and auth enabled',
    {
      config: { app: { baseURL: '/' }, public: { useAuth: true } },
      artist: {
        name: 'Test Artist',
        slug: 'test-artist',
        overview: '<p>Overview content for Test Artist.</p>',
        genres: ['Rock', 'Pop'],
        tags: ['Live', 'Studio'],
        beginArea: 'Test City',
        beginDate: '2000',
        endDate: '2020',
        releaseGroups: [
          {
            slug: 'album-1',
            cover_art_urls: { 500: '/album-1.jpg' },
            name: 'Album One',
            recordings: [
              {
                slug: 'song-1',
                has_lyrics: true,
                name: 'Song One',
                position: 1,
              },
              {
                slug: 'song-2',
                has_lyrics: false,
                name: 'Song Two',
                position: 2,
              },
            ],
          },
        ],
      },
      upvotes: ['user@example.com'],
    },
  ],
  [
    'minimal artist without upvotes and auth disabled',
    {
      config: { app: { baseURL: '/' }, public: { useAuth: false } },
      artist: {
        name: 'Minimal Artist',
        slug: 'minimal-artist',
        overview: '<p>Minimal overview content.</p>',
        genres: [],
        tags: [],
        beginArea: '',
        beginDate: '',
        endDate: '',
        releaseGroups: [],
      },
      upvotes: [],
    },
  ],
];

describe('sPageArtistSingle Snapshot', () => {
  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, { config, artist, upvotes }) => {
      config_ = config;
      artistData_ = artist;
      upvotesData_ = { upvotes };

      const html = await ComponentRender(
        `SPageArtistSingle - ${desc}`,
        {},
        SPageArtistSingle,
      );
      expect(html).toMatchSnapshot();
    },
  );
});
