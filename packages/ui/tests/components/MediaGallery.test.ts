import { describe, expect, it } from 'vitest';
import MediaGallery from '../../components/MediaGallery.vue';
import ComponentRender from '../componentRender';

describe('mediaGallery Snapshot', () => {
  const scenarios: [string, { props: unknown }][] = [
    [
      'with no screenshots',
      { props: { company: { name: 'Acme Corp', screenshots: [] } } },
    ],
    [
      'with a single screenshot',
      {
        props: {
          company: {
            name: 'Beta Inc',
            screenshots: ['https://example.com/screenshot1.jpg'],
          },
        },
      },
    ],
    [
      'with multiple screenshots',
      {
        props: {
          company: {
            name: 'Gamma LLC',
            screenshots: [
              'https://example.com/screenshot1.jpg',
              'https://example.com/screenshot2.jpg',
              'https://example.com/screenshot3.jpg',
            ],
          },
        },
      },
    ],
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `MediaGallery ${desc}`,
        options,
        MediaGallery,
      );
      expect(html).toMatchSnapshot();
    },
  );
});
