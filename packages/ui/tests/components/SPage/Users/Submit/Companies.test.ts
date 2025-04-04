import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import ComponentRender from '../../../../componentRender';
import Companies from '../../../../../components/SPage/Users/Submit/Companies.vue';

// Set up global mocks for session and data fetching.
let session_: { loggedIn: unknown; user: unknown; clear: unknown };
let companySubmissions: unknown = null;

// Simulate the useUserSession hook.
(globalThis as unknown).useUserSession = () => session_;
// Simulate the useCompanySubmissions hook.
(globalThis as unknown).useCompanySubmissions = async () => companySubmissions;
// Ensure navigateTo is defined to prevent redirection during tests.
if (typeof globalThis.navigateTo === 'undefined') {
  globalThis.navigateTo = () => {};
}

// Minimal mock for useSeoMeta
mockNuxtImport('useSeoMeta', () => () => {});

describe('SPage/Users/Submit/Companies Snapshot', () => {
  const scenarios: [string, { session: unknown; companyData: unknown }][] = [
    [
      'with submissions',
      {
        session: {
          loggedIn: ref(true),
          user: ref({ email: 'test@example.com', name: 'Test User' }),
          clear: vi.fn()
        },
        companyData: [
          {
            id: 1,
            isPriority: true,
            approved: true,
            domain: 'example.com',
            logo: 'https://example.com/logo.png',
            name: 'Example Company',
            description: 'A sample description',
            reviewedAt: '2023-01-01',
            reviewedNotes: 'Looks good',
            reviewedBy: 'admin@example.com',
            createdAt: '2022-12-01'
          },
          {
            id: 2,
            isPriority: false,
            approved: false,
            domain: 'test.com',
            logo: null,
            name: 'Test Company',
            description: '',
            reviewedAt: null,
            reviewedNotes: null,
            reviewedBy: null,
            createdAt: '2022-11-15'
          }
        ]
      }
    ],
    [
      'with no submissions',
      {
        session: {
          loggedIn: ref(true),
          user: ref({ email: 'test@example.com', name: 'Test User' }),
          clear: vi.fn()
        },
        companyData: []
      }
    ]
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, { session, companyData }) => {
      // Set the current session and mock submission data.
      session_ = session;
      companySubmissions = companyData;

      const html = await ComponentRender(
        `SPage/Users/Submit/Companies ${desc}`,
        {},
        Companies
      );
      expect(html).toMatchSnapshot();
    }
  );
});
