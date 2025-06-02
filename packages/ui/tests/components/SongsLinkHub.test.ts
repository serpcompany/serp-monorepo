import { describe, expect, it } from 'vitest'
import SongsLinkHub from '../../components/SongsLinkHub.vue'
import ComponentRender from '../componentRender'

describe('songsLinkHub', () => {
  it.each([
    // No songs provided
    ['with no songs', { props: { songs: [] } }],
    // Single song with a single artist (no join phrase)
    [
      'with one song with one artist',
      {
        props: {
          songs: [
            {
              slug: 'song-1',
              name: 'Song One',
              artists: [
                {
                  slug: 'artist-1',
                  credit_name: 'Artist One',
                  join_phrase: '',
                },
              ],
            },
          ],
        },
      },
    ],
    // Multiple songs with multiple artists and join phrases
    [
      'with multiple songs and multiple artists',
      {
        props: {
          songs: [
            {
              slug: 'song-1',
              name: 'Song One',
              artists: [
                {
                  slug: 'artist-1',
                  credit_name: 'Artist One',
                  join_phrase: ', ',
                },
                {
                  slug: 'artist-2',
                  credit_name: 'Artist Two',
                  join_phrase: '',
                },
              ],
            },
            {
              slug: 'song-2',
              name: 'Song Two',
              artists: [
                {
                  slug: 'artist-3',
                  credit_name: 'Artist Three',
                  join_phrase: ' feat. ',
                },
                {
                  slug: 'artist-4',
                  credit_name: 'Artist Four',
                  join_phrase: '',
                },
              ],
            },
          ],
        },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `SongsLinkHub ${desc}`,
        options,
        SongsLinkHub,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
