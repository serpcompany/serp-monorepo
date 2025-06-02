import { describe, expect, it } from 'vitest';
import SHero from '../../components/SHero.vue';
import ComponentRender from '../componentRender';

describe('sHero Snapshot Tests', () => {
  it.each([
    // Default props (using component defaults)
    ['with default props', { props: {} }],
    // Only headline provided
    ['with headline only', { props: { headline: 'Welcome to Our Site' } }],
    // Headline with a subheadline
    [
      'with headline and subheadline',
      {
        props: {
          headline: 'Hello World',
          subheadline: 'This is a subheadline.',
        },
      },
    ],
    // Without search bar
    [
      'without search bar',
      { props: { headline: 'No Search', showSearchBar: false } },
    ],
    // Without buttons
    [
      'without buttons',
      { props: { headline: 'No Buttons', showButtons: false } },
    ],
    // All props customized
    [
      'with custom all props',
      {
        props: {
          headline: 'Custom Hero',
          subheadline: 'Amazing subheadline',
          showSearchBar: false,
          showButtons: false,
        },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(`SHero ${desc}`, options, SHero);
      expect(html).toMatchSnapshot();
    },
  );
});
