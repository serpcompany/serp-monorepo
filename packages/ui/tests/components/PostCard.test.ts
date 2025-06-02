import { describe, expect, it } from 'vitest'
import PostCard from '../../components/PostCard.vue'
import ComponentRender from '../componentRender'

describe('postCard Snapshot', () => {
  // Define test scenarios covering various valid prop combinations
  const scenarios: [string, { props: unknown }][] = [
    [
      'with complete post data',
      {
        props: {
          post: {
            title: 'Test Title',
            module: 'Article',
            featuredImage: 'https://example.com/image.jpg',
            author: 'John Doe',
            createdAt: '2022-10-01',
            excerpt: 'This is a test excerpt for the post.',
            categories: [{ id: 1, slug: 'tech', name: 'Tech' }],
          },
          baseSlug: 'posts/',
          articleClass: 'py-16',
        },
      },
    ],
    [
      'without featured image and author',
      {
        props: {
          post: {
            title: 'No Image Post',
            module: 'Article',
            featuredImage: '',
            excerpt: 'Post without featured image and author info.',
            categories: [],
          },
          baseSlug: 'posts/',
          articleClass: 'py-16',
        },
      },
    ],
    [
      'with custom title prop overriding display title',
      {
        props: {
          post: {
            title: 'Default Title',
            module: 'Article',
            featuredImage: 'https://example.com/image2.jpg',
            author: 'Jane Doe',
            createdAt: '2023-03-01',
            excerpt: 'Post with custom title prop.',
            categories: [{ id: 2, slug: 'news', name: 'News' }],
          },
          baseSlug: 'posts/',
          articleClass: 'py-16',
          title: 'Custom Title',
        },
      },
    ],
  ]

  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(`PostCard ${desc}`, options, PostCard)
      expect(html).toMatchSnapshot()
    },
  )
})
