import { afterAll, describe, expect, it } from 'vitest';
// Import mocks first so they're available when components are imported
import { cleanupDateMocks } from '../mockDateImports';
import '../mockUseUserSession';
// Then import components
import CommentWrapper from '../../components/CommentWrapper.vue';
import ComponentRender from '../componentRender';

describe('CommentWrapper Snapshot', () => {
  const baseProps = {
    module: 'test-module',
    id: 1,
    currentIndex: 0,
    initialMessageLimit: '10',
    maxLineLimit: '40',
    maxShowingDepth: '5',
    maxCommentLength: '1000',
    depthLength: 0,
    commentBackgroundColor: 'white',
    commentTextColor: '#1d2129',
    userNameColor: 'rgb(6, 177, 183)',
    wrapperSize: '1024',
    parentIds: [],
    parentIndices: [],
    comment: {
      id: 101,
      image: 'https://example.com/avatar.jpg',
      name: 'Test User',
      content: 'This is a test comment.\nIt has two lines.',
      timestamp: '1973-04-29T21:33:09Z',
      createdAt: '1973-04-29T21:33:09+00:00',
      updatedAt: '1973-04-29T21:33:09+00:00',
      replies: [],
      replyCount: 0,
      email: 'test@example.com',
      lineCount: 2
    }
  };
  it.each([
    ['default comment', { props: baseProps }],
    [
      'updated comment (with Updated badge)',
      {
        props: {
          ...baseProps,
          comment: {
            ...baseProps.comment,
            updatedAt: '1974-04-29T21:33:09+00:00'
          }
        }
      }
    ],
    [
      'comment with replies',
      {
        props: {
          ...baseProps,
          comment: {
            ...baseProps.comment,
            replies: [
              {
                id: 201,
                image: 'https://example.com/reply-avatar.jpg',
                name: 'Reply User',
                content: 'This is a reply.',
                timestamp: '1973-04-29T21:33:09Z',
                createdAt: '1973-04-29T21:33:09+00:00',
                updatedAt: '1973-04-29T21:33:09+00:00',
                replies: [],
                replyCount: 0,
                email: 'reply@example.com',
                lineCount: 1
              }
            ],
            replyCount: 1
          }
        }
      }
    ],
    [
      'comment with nested replies',
      {
        props: {
          ...baseProps,
          comment: {
            ...baseProps.comment,
            replies: [
              {
                id: 202,
                image: 'https://example.com/reply-avatar.jpg',
                name: 'Reply User',
                content: 'This is a reply.',
                timestamp: '1973-04-29T21:33:09Z',
                createdAt: '1973-04-29T21:33:09+00:00',
                updatedAt: '1973-04-29T21:33:09+00:00',
                replies: [
                  {
                    id: 203,
                    image: 'https://example.com/reply-avatar.jpg',
                    name: 'Reply User',
                    content: 'This is a reply.',
                    timestamp: '1973-04-29T21:33:09Z',
                    createdAt: '1973-04-29T21:33:09+00:00',
                    updatedAt: '1973-04-29T21:33:09+00:00',
                    replies: [],
                    replyCount: 0,
                    email: 'reply@example.com',
                    lineCount: 1
                  },
                  {
                    id: 204,
                    image: 'https://example.com/reply-avatar.jpg',
                    name: 'Reply User',
                    content: 'This is a reply.',
                    timestamp: '1973-04-29T21:33:09Z',
                    createdAt: '1973-04-29T21:33:09+00:00',
                    updatedAt: '1973-04-29T21:33:09+00:00',
                    replies: [],
                    replyCount: 0,
                    email: 'reply@example.com',
                    lineCount: 1
                  }
                ],
                replyCount: 2,
                email: 'reply@example.com',
                lineCount: 1
              }
            ],
            replyCount: 1
          }
        }
      }
    ]
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `CommentWrapper ${desc}`,
        options,
        CommentWrapper
      );
      expect(html).toMatchSnapshot();
    }
  );

  afterAll(() => {
    cleanupDateMocks();
  });
});
