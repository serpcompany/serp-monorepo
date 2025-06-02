import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Purchase from '../../../../components/SPage/Users/Purchase.vue';
import ComponentRender from '../../../componentRender';

// Route mock so we can simulate different query parameters
let routeMock_: { query: Record<string, unknown> } = { query: {} };

mockNuxtImport('useRoute', () => () => routeMock_);
mockNuxtImport('useRouter', () => () => ({
  push: () => {},
  replace: () => {},
  resolve: () => {
    return { href: '' };
  },
}));

describe('sPage/Users/Purchase Snapshot', () => {
  const scenarios: [string, { query: Record<string, unknown> }][] = [
    [
      'renders success state correctly',
      { query: { success: 'true', redirectTo: '/success' } },
    ],
    [
      'renders cancelled state correctly',
      { query: { cancel: 'true', redirectTo: '/cancel' } },
    ],
    [
      'renders error state correctly',
      { query: { error: 'Payment failed', redirectTo: '/error' } },
    ],
    ['renders unknown state correctly', { query: {} }],
  ];

  it.each(scenarios)('%s', async (desc, { query }) => {
    // Update our route mock for the current scenario
    routeMock_ = { query };

    const html = await ComponentRender(
      `SPage/Users/Purchase ${desc}`,
      {},
      Purchase,
    );
    expect(html).toMatchSnapshot();
  });
});
