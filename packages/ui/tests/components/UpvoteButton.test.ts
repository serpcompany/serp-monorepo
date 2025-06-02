import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import UpvoteButton from '../../components/UpvoteButton.vue';
import ComponentRender from '../componentRender';
import '../mockUseUserSession';

mockNuxtImport('useFetch', () => () => ({
  data: ref({ message: 'success' }),
  error: ref(null),
}));

mockNuxtImport('useToast', () => () => ({
  add: vi.fn(),
}));

mockNuxtImport('useRequestHeaders', () => () => ({}));

describe('upvoteButton', () => {
  const baseProps = { id: 1, module: 'posts' };

  it.each([
    // Testing with an empty upvotes array
    ['with no upvotes', { props: { ...baseProps, upvotes: [] } }],
    // Testing with an upvotes array that does not contain the user's email
    [
      'with upvotes not containing user email',
      { props: { ...baseProps, upvotes: ['other@example.com'] } },
    ],
    // Testing with an upvotes array that includes the user's email
    [
      'with upvotes containing user email',
      { props: { ...baseProps, upvotes: ['test@test.com'] } },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `UpvoteButton ${desc}`,
        options,
        UpvoteButton,
      );
      expect(html).toMatchSnapshot();
    },
  );
});
