import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SPagePostGlossaryCollection from '@/components/SPage/Post/Glossary/Collection.vue'
import ComponentRender from '../../../../componentRender'
import '../../../../mockUseUserSession'

interface MockedPost {
  id: number
  name: string
  slug: string
  keyword?: string
  title?: string
}

mockNuxtImport('useHead', () => () => {})
mockNuxtImport('useSeoMeta', () => () => {})

let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    useAuth: false,
  },
}

let data: MockedPost[] = []

mockNuxtImport('useAsyncData', () => {
  return async () => ({
    data: {
      value: data,
    },
    status: {
      value: 'success',
    },
  })
})

mockNuxtImport('useRuntimeConfig', () => () => config_)

describe('sPagePostGlossaryCollection Snapshot', () => {
  const defaultPosts = [
    { id: 1, name: 'Arc', keyword: 'Arc', slug: 'arc' }, // Post with keyword
    { id: 2, name: 'Barc', title: 'Barc', slug: 'barc' }, // Post with title
    { id: 3, name: 'Carc', slug: 'carc' }, // Post with name only
  ]

  const scenarios: [
    string,
    { config: Record<string, unknown>, posts: MockedPost[] },
  ][] = [
    [
      'with posts (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        posts: defaultPosts,
      },
    ],
    [
      'with posts (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        posts: defaultPosts,
      },
    ],
    [
      'without posts (with auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: true } },
        posts: [],
      },
    ],
    [
      'without posts (without auth)',
      {
        config: { app: { baseURL: '/' }, public: { useAuth: false } },
        posts: [],
      },
    ],
  ]
  it.each(scenarios)(
    'renders %s correctly',
    async (desc, { config, posts }) => {
      config_ = config
      data = posts

      const html = await ComponentRender(
        `SPagePostGlossaryCollection ${desc}`,
        {},
        SPagePostGlossaryCollection,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
