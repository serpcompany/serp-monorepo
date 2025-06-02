import { describe, expect, it } from 'vitest'
import AlbumsLinkHub from '../../components/AlbumsLinkHub.vue'
import ComponentRender from '../componentRender'

describe('albumsLinkHub Snapshot', () => {
  it.each([
    ['with no albums', { props: { albums: [] } }],
    [
      'with one album and one artist',
      {
        props: {
          albums: [
            {
              slug: 'album-1',
              name: 'Album One',
              artists: [{ slug: 'artist-1', credit_name: 'Artist One' }],
            },
          ],
        },
      },
    ],
    [
      'with multiple albums and multiple artists',
      {
        props: {
          albums: [
            {
              slug: 'album-1',
              name: 'Album One',
              artists: [
                {
                  slug: 'artist-1',
                  credit_name: 'Artist One',
                  join_phrase: ' & ',
                },
                { slug: 'artist-2', credit_name: 'Artist Two' },
              ],
            },
            {
              slug: 'album-2',
              name: 'Album Two',
              artists: [{ slug: 'artist-3', credit_name: 'Artist Three' }],
            },
          ],
        },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `AlbumsLinkHub ${desc}`,
        options,
        AlbumsLinkHub,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
