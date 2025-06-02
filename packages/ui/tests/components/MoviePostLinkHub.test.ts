/* eslint-disable @typescript-eslint/no-unused-vars  */

import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import MoviePostLinkHub from '../../components/MoviePostLinkHub.vue'
import ComponentRender from '../componentRender'

// Mock data variable to be updated in each test case
let postsData_: Array<{
  slug: string
  keyword: string
  featuredImage: string
}> = []

// Mock the usePosts composable
mockNuxtImport('usePosts', () => async (...args: unknown) => ({
  posts: postsData_,
}))

describe('moviePostLinkHub Snapshot', () => {
  const scenarios: [
    string,
    { posts: Array<{ slug: string, keyword: string, featuredImage: string }> },
  ][] = [
    [
      'with posts',
      {
        posts: [
          {
            slug: 'movie-1',
            keyword: 'Movie One',
            featuredImage: 'https://example.com/movie1.jpg',
          },
          {
            slug: 'movie-2',
            keyword: 'Movie Two',
            featuredImage: 'https://example.com/movie2.jpg',
          },
        ],
      },
    ],
    ['with no posts', { posts: [] }],
  ]

  it.each(scenarios)('renders %s correctly', async (desc, { posts }) => {
    // Update the posts data for this test case
    postsData_ = posts

    const html = await ComponentRender(
      `MoviePostLinkHub ${desc}`,
      {},
      MoviePostLinkHub,
    )
    expect(html).toMatchSnapshot()
  })
})
