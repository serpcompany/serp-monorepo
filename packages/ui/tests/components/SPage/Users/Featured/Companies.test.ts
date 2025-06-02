import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import FeaturedCompanies from '../../../../../components/SPage/Users/Featured/Companies.vue'
import ComponentRender from '../../../../componentRender'

const defaultCategories = [
  { id: 1, name: 'Tech', slug: 'tech' },
  { id: 2, name: 'Business', slug: 'business' },
]

const categoriesData_: unknown = defaultCategories
const allCompaniesData_: unknown = { companies: [], availablePlacements: [] }
const placementAvailabilityData_: unknown = { available: true }
let featuredSubscriptionsData_: unknown = []
let session_: unknown = {
  loggedIn: ref(true),
  user: ref({ name: 'Test User', email: 'test@test.com' }),
}

mockNuxtImport(
  'useCompanyCategories',
  () => () => Promise.resolve(categoriesData_),
)
mockNuxtImport(
  'useAllCompaniesForCategory',
  () => () => Promise.resolve(allCompaniesData_),
)
mockNuxtImport(
  'useCheckPlacementAvailability',
  () => () => Promise.resolve(placementAvailabilityData_),
)
mockNuxtImport(
  'useCompanyFeaturedSubscriptions',
  () => () => Promise.resolve(featuredSubscriptionsData_),
)
mockNuxtImport('useSeoMeta', () => () => {})
mockNuxtImport('useToast', () => () => ({ add: vi.fn() }))
mockNuxtImport('useUserSession', () => () => session_)

describe('sPage/Users/Featured/Companies Snapshot', () => {
  const scenarios = [
    {
      desc: 'when user is logged in with featured companies',
      session: {
        loggedIn: ref(true),
        user: ref({ name: 'Test User', email: 'test@test.com' }),
      },
      featuredData: [
        {
          id: 1,
          entityName: 'Example',
          entitySlug: 'example.com',
          isActive: true,
          categorySlug: 'tech',
          categoryName: 'Tech',
          placement: 1,
          createdAt: '2025-01-01',
        },
      ],
    },
    {
      desc: 'when user is logged in with no featured companies',
      session: {
        loggedIn: ref(true),
        user: ref({ name: 'Test User', email: 'test@test.com' }),
      },
      featuredData: [],
    },
    {
      desc: 'when user is not logged in',
      session: {
        loggedIn: ref(false),
        user: ref(null),
      },
      featuredData: [],
    },
  ]

  scenarios.forEach(({ desc, session, featuredData }) => {
    it(`renders ${desc} correctly`, async () => {
      // Update session and subscriptions for this scenario
      session_ = session
      featuredSubscriptionsData_ = featuredData

      const html = await ComponentRender(
        `SPage/Users/Featured/Companies ${desc}`,
        {},
        FeaturedCompanies,
      )
      expect(html).toMatchSnapshot()
    })
  })
})
