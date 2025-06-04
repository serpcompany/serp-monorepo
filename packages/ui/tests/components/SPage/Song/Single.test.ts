import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SPageSongSingle from '../../../../components/SPage/Song/Single.vue'
import ComponentRender from '../../../componentRender'
import '../../../mockUseUserSession'

mockNuxtImport('useSeoMeta', () => () => {})

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: false,
  },
}
let songData_: unknown = {}
let upvotesData_: unknown = { upvotes: [] }

mockNuxtImport('useRuntimeConfig', () => () => config_)
mockNuxtImport('useSong', () => () => songData_)
mockNuxtImport('useFetchWithCache', () => () => upvotesData_)

const scenarios: [
  string,
  { config: Record<string, unknown>, song: unknown, upvotes: string[] },
][] = [
  [
    'complete song with upvotes and auth enabled',
    {
      config: { app: { baseURL: '/' }, public: { useAuth: true } },
      song: {
        name: 'Test Song',
        slug: 'test-song',
        overview: '<p>Overview content for Test Song.</p>',
        genres: ['Rock', 'Pop'],
        tags: ['Live', 'Studio'],
        lyrics: '<p>Test lyrics content.</p>',
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
        artists: [
          { slug: 'artist-1', credit_name: 'Artist One', join_phrase: '' },
        ],
      },
      upvotes: ['user@example.com'],
    },
  ],
  [
    'minimal song without upvotes and auth disabled',
    {
      config: { app: { baseURL: '/' }, public: { useAuth: false } },
      song: {
        name: 'Minimal Song',
        slug: 'minimal-song',
        overview: '',
        genres: [],
        tags: [],
        releaseGroups: [],
        artists: [],
      },
      upvotes: [],
    },
  ],
]

describe('sPageSongSingle Snapshot', () => {
  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, { config, song, upvotes }) => {
      config_ = config
      songData_ = song
      upvotesData_ = { upvotes }

      const html = await ComponentRender(
        `SPageSongSingle - ${desc}`,
        {},
        SPageSongSingle,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
