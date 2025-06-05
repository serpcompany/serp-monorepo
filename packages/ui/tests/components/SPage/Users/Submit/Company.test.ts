/* eslint-disable ts/no-unused-vars  */

import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import SubmitCompany from '../../../../../components/SPage/Users/Submit/Company.vue'
import ComponentRender from '../../../../componentRender'

// Module level variables for mutable state
let routeMock_: Record<string, unknown> = { query: {} }
let session_: unknown
const s3Object_ = {
  upload: async () => '/api/s3/query/dummy',
}
const companyCategoriesData_ = [
  { id: 1, name: 'Tech', slug: 'tech' },
  { id: 2, name: 'Finance', slug: 'finance' },
]
const companySubmissionsData_ = {
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
  isPriority: false,
}

// Mock all Nuxt imports
mockNuxtImport('useRoute', () => () => routeMock_)
mockNuxtImport('useUserSession', () => () => session_)
globalThis.useS3Object = () => s3Object_
mockNuxtImport(
  'useCompanyCategories',
  () => async () => companyCategoriesData_,
)
mockNuxtImport(
  'useCompanySubmissions',
  () => async (id: string) => companySubmissionsData_,
)
mockNuxtImport('useToast', () => () => ({
  add: vi.fn(),
}))
mockNuxtImport('useRuntimeConfig', () => () => ({
  public: {
    cloudflareR2PublicUrl: 'https://dummy.cloudflare/',
  },
}))

describe('sPage/Users/Submit/Company Snapshot', () => {
  const scenarios: [
    string,
    { session: unknown, route: Record<string, unknown> },
  ][] = [
    [
      'New Submission (no id)',
      {
        session: {
          loggedIn: ref(true),
          user: ref({ email: 'test@test.com' }),
        },
        route: { query: {} },
      },
    ],
    [
      'Existing Submission (with id)',
      {
        session: {
          loggedIn: ref(true),
          user: ref({ email: 'test@test.com' }),
        },
        route: { query: { id: 'existing' } },
      },
    ],
  ]

  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { session, route }) => {
      // Update the mutable session and route for the current scenario
      session_ = session
      routeMock_ = route

      const html = await ComponentRender(
        `SPage/Users/Submit/Company ${desc}`,
        {},
        SubmitCompany,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
