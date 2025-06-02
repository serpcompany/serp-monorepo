import { describe, expect, it } from 'vitest';
import MultipageHeader from '../../components/MultipageHeader.vue';
import ComponentRender from '../componentRender';

describe('multipageHeader Snapshot', () => {
  const baseProps = {
    name: 'Music Header',
    sections: ['Home', 'About', 'Contact'],
    serply_link: 'https://example.com',
  };

  it.each([
    // Default rendering with minimal required props.
    ['default rendering', { props: { ...baseProps } }],
    // With an optional oneLiner and an image provided.
    [
      'with oneLiner and image',
      {
        props: {
          ...baseProps,
          oneLiner: 'One liner test',
          image: 'https://example.com/logo.png',
        },
      },
    ],
    // Edge-case: empty sections.
    ['with empty sections', { props: { ...baseProps, sections: [] } }],
    // Rendering with a custom upvote slot.
    [
      'with upvote slot',
      {
        props: { ...baseProps },
        slots: { upvote: () => '<button>Upvote</button>' },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown; slots?: unknown }) => {
      const html = await ComponentRender(
        `MultipageHeader ${desc}`,
        options,
        MultipageHeader,
      );
      expect(html).toMatchSnapshot();
    },
  );
});
