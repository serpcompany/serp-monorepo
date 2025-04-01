import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import ProfileDropdown from '../../components/ProfileDropdown.client.vue';
import ComponentRender from '../componentRender';

// Declare a mutable session_ variable.
let session_: { loggedIn: unknown; user: unknown; clear: unknown };
// Set the global mock once.
(globalThis as unknown).useUserSession = () => session_;

describe('ProfileDropdown Snapshot', () => {
  // Reset session_ before each test.
  beforeEach(() => {
    session_ = { loggedIn: ref(false), user: ref(null), clear: vi.fn() };
  });

  const scenarios: [
    string,
    { session: { loggedIn: unknown; user: unknown; clear: unknown } }
  ][] = [
    [
      'when logged in',
      {
        session: {
          loggedIn: ref(true),
          user: ref({
            name: 'Test User',
            email: 'test@test.com',
            image: 'https://example.com/test.jpg'
          }),
          clear: vi.fn()
        }
      }
    ],
    [
      'when not logged in',
      {
        session: {
          loggedIn: ref(false),
          user: ref(null),
          clear: vi.fn()
        }
      }
    ]
  ];

  it.each(scenarios)('renders %s correctly', async (desc, { session }) => {
    // Update the global session for this scenario.
    session_ = session;

    // Render the component and generate the snapshot.
    const html = await ComponentRender(
      `ProfileDropdown ${desc}`,
      {},
      ProfileDropdown
    );
    expect(html).toMatchSnapshot();
  });
});
