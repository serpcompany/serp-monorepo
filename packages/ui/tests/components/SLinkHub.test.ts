import { describe, expect, it } from 'vitest';
import SLinkHub from '../../components/SLinkHub.vue';
import ComponentRender from '../componentRender';

describe('sLinkHub', () => {
  it.each([
    // Testing with no categories and default headline (null)
    [
      'with no categories',
      { props: { categories: [], baseSlug: 'linkhub', headline: null } },
    ],
    // Testing with a single category and a custom headline
    [
      'with one category',
      {
        props: {
          categories: [{ slug: 'category-1', name: 'Category 1' }],
          baseSlug: 'linkhub',
          headline: 'Featured Links',
        },
      },
    ],
    // Testing with multiple categories and a custom headline
    [
      'with multiple categories',
      {
        props: {
          categories: [
            { slug: 'cat-1', name: 'Category One' },
            { slug: 'cat-2', name: 'Category Two' },
            { slug: 'cat-3', name: 'Category Three' },
          ],
          baseSlug: 'linkhub',
          headline: 'Our Categories',
        },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(`SLinkHub ${desc}`, options, SLinkHub);
      expect(html).toMatchSnapshot();
    },
  );
});
