import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import ComponentRender from '../../../../componentRender';
import SubmitCompany from '../../../../../components/SPage/Users/Submit/Company.vue';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';

// Global mock for useRoute
let routeMock = { query: {} };
globalThis.useRoute = () => routeMock;

// Global mock for useUserSession
let session_;
globalThis.useUserSession = () => session_;

// Global mock for S3 dependency
globalThis.useS3Object = () => ({
  upload: async () => '/api/s3/query/dummy'
});

// Global mocks for useCompanyCategories and useCompanySubmissions
globalThis.useCompanyCategories = async () => [
  { id: 1, name: 'Tech', slug: 'tech' },
  { id: 2, name: 'Finance', slug: 'finance' }
];

globalThis.useCompanySubmissions = async (id: string) => {
  return {
    id: 123,
    approved: false,
    name: 'Test Company',
    domain: 'testcompany.com',
    pricing: 'Paid',
    tags: 'innovative, startup',
    oneLiner: 'Best company ever',
    description: 'Detailed description',
    categories: [1, 2],
    logo: 'logo.png',
    uuid: 'uuid-123',
    isPriority: false
  };
};

// Other dependency mocks via mockNuxtImport
mockNuxtImport('useToast', () => () => ({
  add: vi.fn()
}));

mockNuxtImport('useRuntimeConfig', () => () => ({
  public: {
    cloudflareR2PublicUrl: 'https://dummy.cloudflare/'
  }
}));

describe('SPage/Users/Submit/Company Snapshot', () => {
  const scenarios: [
    string,
    { session: unknown; route: Record<string, unknown> }
  ][] = [
    [
      'New Submission (no id)',
      {
        session: {
          loggedIn: ref(true),
          user: ref({ email: 'test@test.com' })
        },
        route: { query: {} }
      }
    ],
    [
      'Existing Submission (with id)',
      {
        session: {
          loggedIn: ref(true),
          user: ref({ email: 'test@test.com' })
        },
        route: { query: { id: 'existing' } }
      }
    ]
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { session, route }) => {
      // Update the mutable session and route for the current scenario
      session_ = session;
      routeMock = route;

      const html = await ComponentRender(
        `SPage/Users/Submit/Company ${desc}`,
        {},
        SubmitCompany
      );
      expect(html).toMatchSnapshot();
    }
  );
});
