import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import ComponentRender from '../../../../componentRender';
import FeaturedCompanies from '../../../../../components/SPage/Users/Featured/Companies.vue';

const defaultCategories = [
  { id: 1, name: 'Tech', slug: 'tech' },
  { id: 2, name: 'Business', slug: 'business' }
];

globalThis.useCompanyCategories = () => Promise.resolve(defaultCategories);
globalThis.useAllCompaniesForCategory = () =>
  Promise.resolve({ companies: [], availablePlacements: [] });
globalThis.useCheckPlacementAvailability = () =>
  Promise.resolve({ available: true });
globalThis.useCompanyFeaturedSubscriptions = () => Promise.resolve([]);
globalThis.useSeoMeta = () => {};
globalThis.useToast = () => ({ add: vi.fn() });

let session_ = {
  loggedIn: ref(true),
  user: ref({ name: 'Test User', email: 'test@test.com' })
};
globalThis.useUserSession = () => session_;

describe('SPage/Users/Featured/Companies Snapshot', () => {
  const scenarios = [
    {
      desc: 'when user is logged in with featured companies',
      session: {
        loggedIn: ref(true),
        user: ref({ name: 'Test User', email: 'test@test.com' })
      },
      featuredData: [
        {
          id: 1,
          companyDomain: 'example.com',
          isActive: true,
          categorySlug: 'tech',
          categoryName: 'Tech',
          placement: 1,
          createdAt: '2025-01-01'
        }
      ]
    },
    {
      desc: 'when user is logged in with no featured companies',
      session: {
        loggedIn: ref(true),
        user: ref({ name: 'Test User', email: 'test@test.com' })
      },
      featuredData: []
    },
    {
      desc: 'when user is not logged in',
      session: {
        loggedIn: ref(false),
        user: ref(null)
      },
      featuredData: []
    }
  ];

  scenarios.forEach(({ desc, session, featuredData }) => {
    it(`renders ${desc} correctly`, async () => {
      // Update global session and subscriptions for this scenario
      session_ = session;
      globalThis.useUserSession = () => session_;
      globalThis.useCompanyFeaturedSubscriptions = () =>
        Promise.resolve(featuredData);

      const html = await ComponentRender(
        `SPage/Users/Featured/Companies ${desc}`,
        {},
        FeaturedCompanies
      );
      expect(html).toMatchSnapshot();
    });
  });
});
