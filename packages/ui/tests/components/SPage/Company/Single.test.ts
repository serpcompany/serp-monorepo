import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SPageCompanySingle from '../../../../components/SPage/Company/Single.vue'
import ComponentRender from '../../../componentRender'
import '../../../mockUseUserSession'

mockNuxtImport('useSeoMeta', () => () => {})

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: false,
  },
}

let companyData_: unknown = {}
let commentsData_: unknown = { comments: [] }
const reviewsData_: unknown = {
  reviews: [
    { id: 1, rating: 4, title: 'Good service', content: 'I liked it' },
    {
      id: 2,
      rating: 5,
      title: 'Excellent',
      content: 'The best service',
    },
  ],
  userReview: null,
}

mockNuxtImport('useRuntimeConfig', () => () => config_)
mockNuxtImport('useCompany', () => () => Promise.resolve(companyData_))
mockNuxtImport(
  'useCompanyComments',
  () => () => Promise.resolve(commentsData_),
)
mockNuxtImport('useCompanyReviews', () => () => Promise.resolve(reviewsData_))

describe('sPageCompanySingle Snapshot', () => {
  const scenarios: [
    string,
    {
      config: Record<string, unknown>
      companyData: Record<string, unknown>
      comments: { comments: unknown[] }
    },
  ][] = [
    [
      'complete company data (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        companyData: {
          id: 1,
          name: 'Test Company',
          oneLiner: 'We test companies',
          logo: '/logo.png',
          serplyLink: 'https://serply.com',
          excerpt: 'Company overview excerpt',
          content: '<p>Company article content</p>',
          features: [{ item: 'Feature A', description: 'Description A' }],
          faqs: [
            { question: 'What is this?', answer: 'This is a test company.' },
          ],
          alternatives: ['Alternative 1', 'Alternative 2'],
          screenshots: ['/screenshot1.png'],
          categories: [{ id: 10, slug: 'cat-1', name: 'Category 1' }],
          numReviews: 10,
          numOneStarReviews: 1,
          numTwoStarReviews: 2,
          numThreeStarReviews: 3,
          numFourStarReviews: 2,
          numFiveStarReviews: 2,
          averageRating: 4.2,
        },
        comments: {
          comments: [{ id: 100, content: 'Great company!', replies: [] }],
        },
      },
    ],
    [
      'minimal company data (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        companyData: {
          id: 2,
          name: 'Minimal Company',
          oneLiner: 'Minimal details',
          logo: '/minimal-logo.png',
          serplyLink: 'https://serply.com',
          excerpt: '',
          content: '',
          features: null,
          faqs: null,
          alternatives: null,
          screenshots: null,
          categories: null,
        },
        comments: {
          comments: [],
        },
      },
    ],
    [
      'complete company data (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        companyData: {
          id: 1,
          name: 'Test Company',
          oneLiner: 'We test companies',
          logo: '/logo.png',
          serplyLink: 'https://serply.com',
          excerpt: 'Company overview excerpt',
          content: '<p>Company article content</p>',
          features: [{ item: 'Feature A', description: 'Description A' }],
          faqs: [
            { question: 'What is this?', answer: 'This is a test company.' },
          ],
          alternatives: ['Alternative 1', 'Alternative 2'],
          screenshots: ['/screenshot1.png'],
          categories: [{ id: 10, slug: 'cat-1', name: 'Category 1' }],
        },
        comments: {
          comments: [{ id: 100, content: 'Great company!', replies: [] }],
        },
      },
    ],
    [
      'minimal company data (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        companyData: {
          id: 2,
          name: 'Minimal Company',
          oneLiner: 'Minimal details',
          logo: '/minimal-logo.png',
          serplyLink: 'https://serply.com',
          excerpt: '',
          content: '',
          features: null,
          faqs: null,
          alternatives: null,
          screenshots: null,
          categories: null,
        },
        comments: {
          comments: [],
        },
      },
    ],
  ]

  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { config, companyData, comments }) => {
      config_ = config
      companyData_ = companyData
      commentsData_ = comments

      const html = await ComponentRender(
        `SPageCompanySingle ${desc}`,
        {},
        SPageCompanySingle,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
