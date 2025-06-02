import { describe, expect, it } from 'vitest';
import CompanyOverview from '../../components/CompanyOverview.vue';
import ComponentRender from '../componentRender';

describe('companyOverview Snapshot', () => {
  it.each([
    [
      'with a normal company excerpt',
      {
        props: {
          company: {
            excerpt: 'Leading the industry with innovative solutions.',
          },
        },
      },
    ],
    ['with an empty excerpt', { props: { company: { excerpt: '' } } }],
    [
      'with a long company excerpt',
      {
        props: {
          company: {
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
              .repeat(5)
              .trim(),
          },
        },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `CompanyOverview ${desc}`,
        options,
        CompanyOverview,
      );
      expect(html).toMatchSnapshot();
    },
  );
});
