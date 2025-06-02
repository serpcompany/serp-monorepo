import { describe, expect, it } from 'vitest';
import ArtistsLinkHub from '../../components/ArtistsLinkHub.vue';
import ComponentRender from '../componentRender';

describe('artistsLinkHub Snapshot', () => {
  const baseArtists = [
    { slug: 'artist-1', name: 'Artist 1' },
    { slug: 'artist-2', name: 'Artist 2' },
    { slug: 'artist-3', name: 'Artist 3' },
  ];

  it.each([
    ['with no artists', { props: { artists: [] } }],
    ['with one artist', { props: { artists: [baseArtists[0]] } }],
    ['with multiple artists', { props: { artists: baseArtists } }],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `ArtistsLinkHub ${desc}`,
        options,
        ArtistsLinkHub,
      );
      expect(html).toMatchSnapshot();
    },
  );
});
