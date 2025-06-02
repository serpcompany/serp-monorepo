import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import Logout from '../../../components/SPage/Logout.vue';
import ComponentRender from '../../componentRender';

const userSessionMock = {
  loggedIn: ref(true),
  user: ref({ name: 'Test User', email: 'test@test.com' }),
  clear: vi.fn(),
} as unknown;

mockNuxtImport('useUserSession', () => () => userSessionMock);

describe('sPageLogout Snapshot', () => {
  const scenarios: [string, { loggedIn: boolean }][] = [
    ['when user is logged in', { loggedIn: true }],
    ['when user is not logged in', { loggedIn: false }],
  ];

  it.each(scenarios)(
    'handles %s correctly',
    async (desc: string, { loggedIn }) => {
      // Update the mock state for this test scenario.
      userSessionMock.loggedIn.value = loggedIn;

      // Mock navigateTo to capture redirection calls.
      mockNuxtImport('navigateTo', () => vi.fn());

      // Render the Logout component.
      const html = await ComponentRender(`Logout ${desc}`, {}, Logout);
      expect(html).toMatchSnapshot();
    },
  );
});
