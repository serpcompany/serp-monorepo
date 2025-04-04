import { describe, expect, it, vi } from 'vitest';
import ComponentRender from '../../../../componentRender';
import PurchaseIndex from '../../../../../components/SPage/Users/Purchase/Index.vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

// Global route mock so we can simulate different query parameters
let routeMock = { query: {} };
globalThis.useRoute = () => routeMock;

// Global router mock with a spy on push
const routerMock = { push: vi.fn() };
globalThis.useRouter = () => routerMock;

describe('SPage/Users/Purchase/Index Snapshot', () => {
  const scenarios: [string, { query: Record<string, unknown> }][] = [
    [
      'renders success state correctly',
      { query: { success: 'true', redirectTo: '/success' } }
    ],
    [
      'renders cancelled state correctly',
      { query: { cancel: 'true', redirectTo: '/cancel' } }
    ],
    [
      'renders error state correctly',
      { query: { error: 'Payment failed', redirectTo: '/error' } }
    ],
    ['renders unknown state correctly', { query: {} }]
  ];

  it.each(scenarios)('%s', async (desc, { query }) => {
    // Update our global route mock for the current scenario
    routeMock = { query };
    const html = await ComponentRender(
      `SPage/Users/Purchase/Index ${desc}`,
      {},
      PurchaseIndex
    );
    expect(html).toMatchSnapshot();
  });
});
