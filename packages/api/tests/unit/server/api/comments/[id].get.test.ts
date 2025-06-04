import { getDb } from '@serp/db/server/database'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockGetQuery, mockSql } from '../../../../setup'

describe('comments Get API', () => {
  let handler
  let mockGetRouterParams

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    // Default query parameters
    mockGetQuery.mockReturnValue({ page: '1', pageSize: '10' })

    // Setup router params mock
    mockGetRouterParams = vi.fn().mockReturnValue({ id: '123' })
    globalThis.getRouterParams = mockGetRouterParams

    // Import handler
    handler = (await import('../../../../../server/api/comments/[id].get'))
      .default
  })

  it('should return 400 if ID is missing', async () => {
    mockGetRouterParams.mockReturnValueOnce({})

    const result = await handler({})

    expect(result).toEqual({ status: 400, message: 'ID is required' })
  })

  it('should fetch comments with default pagination', async () => {
    const mockComments = [
      {
        id: '1',
        created_at: '2023-01-01',
        updated_at: '2023-01-01',
        content: 'Top level comment',
        parent_id: null,
        path: '1',
        user_id: 'user1',
        name: 'User One',
        image: 'avatar1.jpg',
        depth: 1,
      },
      {
        id: '2',
        created_at: '2023-01-02',
        updated_at: '2023-01-02',
        content: 'Reply to top level',
        parent_id: '1',
        path: '1.2',
        user_id: 'user2',
        name: 'User Two',
        image: 'avatar2.jpg',
        depth: 2,
      },
    ]

    mockDb.execute.mockResolvedValueOnce([
      {
        total_count: 1,
        comments: mockComments,
      },
    ])

    const result = await handler({})

    expect(getDb).toHaveBeenCalled()
    expect(mockSql).toHaveBeenCalled()
    expect(result).toHaveProperty('comments')
    expect(result).toHaveProperty('pagination')
    expect(result.pagination).toEqual({
      currentPage: 1,
      pageSize: 10,
      totalItems: 1,
    })

    // Verify proper nesting of comments
    expect(result.comments.length).toBe(1)
    expect(result.comments[0].id).toBe('1')
    expect(result.comments[0].replies.length).toBe(1)
    expect(result.comments[0].replies[0].id).toBe('2')
  })

  it('should handle custom pagination parameters', async () => {
    mockGetQuery.mockReturnValue({ page: '2', pageSize: '5' })

    mockDb.execute.mockResolvedValueOnce([
      {
        total_count: 12,
        comments: [],
      },
    ])

    const result = await handler({})

    expect(mockSql).toHaveBeenCalled()
    expect(result.pagination).toEqual({
      currentPage: 2,
      pageSize: 5,
      totalItems: 12,
    })
  })

  it('should handle empty results', async () => {
    mockDb.execute.mockResolvedValueOnce([
      {
        total_count: 0,
        comments: null,
      },
    ])

    const result = await handler({})

    expect(result).toEqual({
      comments: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
      },
    })
  })

  it('should handle errors gracefully', async () => {
    mockDb.execute.mockRejectedValueOnce(new Error('Database error'))

    const result = await handler({})

    expect(result).toEqual({ status: 500, message: 'Database error' })
  })
})
