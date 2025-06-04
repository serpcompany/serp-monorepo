import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import SPageCompanyCollection from '../../../../components/SPage/Company/Collection.vue'
import ComponentRender from '../../../componentRender'
import '../../../mockUseUserSession'

mockNuxtImport('useSeoMeta', () => () => {})

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: false,
  },
}
let categoriesData_: unknown = []
let companiesData_: unknown = { companies: [], pagination: { totalItems: 0 } }

mockNuxtImport('useRuntimeConfig', () => () => config_)
mockNuxtImport(
  'useCompanyCategories',
  () => () => Promise.resolve(categoriesData_),
)
mockNuxtImport('useCompanies', () => () => Promise.resolve(companiesData_))

// Mock useAsyncData to ensure consistent loading state across environments
mockNuxtImport('useAsyncData', () => (key: string, _fn: Function) => {
  if (key === 'companies') {
    return {
      data: ref(companiesData_),
      status: ref('success'), // Ensure consistent non-loading state
    }
  }
  if (key === 'categories') {
    return {
      data: ref(categoriesData_),
      status: ref('success'), // Ensure consistent non-loading state
    }
  }
  return {
    data: ref(null),
    status: ref('success'),
  }
})

describe('sPageCompanyCollection Snapshot', () => {
  const scenarios: [
    string,
    {
      config: Record<string, unknown>
      categories: unknown
      companies: unknown
    },
  ][] = [
    [
      'renders correctly with categories (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        categories: [
          { id: 1, slug: 'tech', name: 'Tech' },
          { id: 2, slug: 'finance', name: 'Finance' },
        ],
        companies: {
          companies: [
            { slug: 'company-a', name: 'Company A' },
            { slug: 'company-b', name: 'Company B' },
          ],
          pagination: { totalItems: 2 },
        },
      },
    ],
    [
      'renders correctly without categories (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        categories: [],
        companies: {
          companies: [
            { slug: 'company-a', name: 'Company A' },
            { slug: 'company-b', name: 'Company B' },
          ],
          pagination: { totalItems: 2 },
        },
      },
    ],
    [
      'renders correctly with categories (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        categories: [
          { id: 1, slug: 'tech', name: 'Tech' },
          { id: 2, slug: 'finance', name: 'Finance' },
        ],
        companies: {
          companies: [
            { slug: 'company-a', name: 'Company A' },
            { slug: 'company-b', name: 'Company B' },
          ],
          pagination: { totalItems: 2 },
        },
      },
    ],
    [
      'renders correctly without categories (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        categories: [],
        companies: {
          companies: [
            { slug: 'company-a', name: 'Company A' },
            { slug: 'company-b', name: 'Company B' },
          ],
          pagination: { totalItems: 2 },
        },
      },
    ],
  ]

  it.each(scenarios)(
    '%s',
    async (desc: string, { config, categories, companies }) => {
      config_ = config
      categoriesData_ = categories
      companiesData_ = companies

      const html = await ComponentRender(
        `SPageCompanyCollection ${desc}`,
        {},
        SPageCompanyCollection,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
