import { afterAll, describe, expect, it } from 'vitest';
// Import mocks first so they're available when components are imported
import { cleanupDateMocks } from '../mockDateImports';
import '../mockUseUserSession';
// Then import components
import CommentsContainer from '../../components/CommentsContainer.vue';
import ComponentRender from '../componentRender';

// Define various scenarios to snapshot test different prop combinations.
const scenarios: [string, { props: Record<string, unknown> }][] = [
  [
    'default state with no comments',
    {
      props: {
        module: 'blog',
        id: 1,
        // Using default values for other props.
        comments: []
      }
    }
  ],
  [
    'with a single comment',
    {
      props: {
        module: 'blog',
        id: 1,
        comments: [
          {
            id: 101,
            email: 'user@example.com',
            name: 'John Doe',
            image: 'https://example.com/avatar.jpg',
            content: 'Great post!',
            createdAt: '1973-04-29T21:33:09+00:00',
            updatedAt: '1973-04-29T21:33:09+00:00',
            replies: []
          }
        ]
      }
    }
  ],
  [
    'with nested comment',
    {
      props: {
        module: 'blog',
        id: 1,
        comments: [
          {
            id: 204,
            email: 'user@example.com',
            name: 'John Doe',
            image: 'https://example.com/avatar.jpg',
            content: 'Great post!',
            createdAt: '1973-04-29T21:33:09+00:00',
            updatedAt: '1973-04-29T21:33:09+00:00',
            replies: [
              {
                id: 205,
                email: 'user1@example.com',
                name: 'Alice',
                image: 'https://example.com/alice.jpg',
                content: 'Nice work!',
                createdAt: '1973-04-29T21:33:09+00:00',
                updatedAt: '1973-04-29T21:33:09+00:00',
                replies: [
                  {
                    id: 206,
                    email: 'user1@example.com',
                    name: 'Alice',
                    image: 'https://example.com/alice.jpg',
                    content: 'Nice work!',
                    createdAt: '1973-04-29T21:33:09+00:00',
                    updatedAt: '1973-04-29T21:33:09+00:00',
                    replies: []
                  },
                  {
                    id: 207,
                    email: 'user1@example.com',
                    name: 'Alice',
                    image: 'https://example.com/alice.jpg',
                    content: 'Nice work!',
                    createdAt: '1973-04-29T21:33:09+00:00',
                    updatedAt: '1973-04-29T21:33:09+00:00',
                    replies: []
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ],
  [
    'with multiple comments and custom styling',
    {
      props: {
        module: 'forum',
        id: 2,
        background: '#f0f0f0',
        commentBackgroundColor: '#fff',
        commentTextColor: '#333',
        userNameColor: '#ff0000',
        comments: [
          {
            id: 201,
            email: 'user1@example.com',
            name: 'Alice',
            image: 'https://example.com/alice.jpg',
            content: 'Nice work!',
            createdAt: '1973-04-29T21:33:09+00:00',
            updatedAt: '1973-04-29T21:33:09+00:00',
            replies: []
          },
          {
            id: 202,
            email: 'user2@example.com',
            name: 'Bob',
            image: 'https://example.com/bob.jpg',
            content: 'I disagree',
            createdAt: '1973-04-29T21:33:09+00:00',
            updatedAt: '1973-04-29T21:33:09+00:00',
            replies: []
          }
        ]
      }
    }
  ]
];

describe('CommentsContainer Snapshot', () => {
  it.each(scenarios)('renders %s correctly', async (desc: string, options) => {
    // Render the component with the provided props using the Nuxt testing utility.
    const html = await ComponentRender(
      `CommentsContainer ${desc}`,
      options,
      CommentsContainer
    );
    expect(html).toMatchSnapshot();
  });

  afterAll(() => {
    cleanupDateMocks();
  });
});
