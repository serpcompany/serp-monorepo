// tests/components/GlossaryTermCard.snapshot.test.ts
import { describe, expect, it } from 'vitest';
import GlossaryTermCard from '../../components/GlossaryTermCard.vue';
import ComponentRender from '../componentRender';

describe('glossaryTermCard Snapshot', () => {
  it.each([
    [
      'with keyword provided',
      {
        props: {
          term: {
            slug: 'example-term',
            keyword: 'Example Keyword',
            title: 'Example Title',
            oneLiner: 'A brief overview of the term.',
          },
        },
      },
    ],
    [
      'without keyword (fallback to title)',
      {
        props: {
          term: {
            slug: 'example-term',
            keyword: '',
            title: 'Example Title',
            oneLiner: 'A brief overview of the term.',
          },
        },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `GlossaryTermCard ${desc}`,
        options,
        GlossaryTermCard,
      );
      expect(html).toMatchSnapshot();
    },
  );
});
