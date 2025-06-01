import { getDb } from '@serp/db/server/database'
import { sql } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockReadBody } from '../../../../setup'

describe('comments Post API', () => {
  let handler
  let mockGetRouterParams
  let mockGetQuery
  let mockRequireUserSession

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    // Setup mock user session
    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123' },
    })
    globalThis.requireUserSession = mockRequireUserSession

    // Setup router params mock
    mockGetRouterParams = vi.fn().mockReturnValue({ id: 'entity-123' })
    globalThis.getRouterParams = mockGetRouterParams

    // Setup query params mock
    mockGetQuery = vi.fn().mockReturnValue({ module: 'test-module' })
    globalThis.getQuery = mockGetQuery

    // Mock successful insert
    mockDb.returning.mockResolvedValueOnce([{ id: 'new-comment-id' }])

    // Import handler
    handler = (await import('../../../../../server/api/comments/[id].post'))
      .default
  })

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null })

    const result = await handler({})

    expect(result).toEqual({ status: 401, message: 'Unauthorized' })
  })

  it('should return 400 if ID is missing', async () => {
    mockGetRouterParams.mockReturnValueOnce({})

    const result = await handler({})

    expect(result).toEqual({ status: 400, message: 'ID is required' })
  })

  it('should create a new comment successfully', async () => {
    const commentData = {
      comment: 'This is a test comment',
      parentIds: null,
      module: 'test-module',
    }
    mockReadBody.mockResolvedValueOnce(commentData)

    const result = await handler({})

    expect(result).toEqual({
      status: 200,
      message: 'success',
      id: 'new-comment-id',
    })
    expect(getDb).toHaveBeenCalled()
    expect(mockDb.insert).toHaveBeenCalled()
    expect(mockDb.values).toHaveBeenCalledWith({
      entity: 'entity-123',
      user: 'user-123',
      content: 'This is a test comment',
      parentId: null,
      createdAt: expect.anything(),
    })
    expect(mockDb.returning).toHaveBeenCalled()
  })

  it('should create a new comment with a parent comment', async () => {
    const commentData = {
      comment: 'This is a reply',
      parentIds: ['parent-comment-id'],
      module: 'test-module',
    }
    mockReadBody.mockResolvedValueOnce(commentData)

    const result = await handler({})

    expect(result).toEqual({
      status: 200,
      message: 'success',
      id: 'new-comment-id',
    })
    expect(mockDb.values).toHaveBeenCalledWith({
      entity: 'entity-123',
      user: 'user-123',
      content: 'This is a reply',
      parentId: 'parent-comment-id',
      createdAt: expect.anything(),
    })
  })

  it('should handle multiple parent IDs correctly', async () => {
    const commentData = {
      comment: 'This is a nested reply',
      parentIds: ['parent-id-1', 'parent-id-2', 'parent-id-3'],
      module: 'test-module',
    }
    mockReadBody.mockResolvedValueOnce(commentData)

    const result = await handler({})

    expect(result).toEqual({
      status: 200,
      message: 'success',
      id: 'new-comment-id',
    })
    expect(mockDb.values).toHaveBeenCalledWith({
      entity: 'entity-123',
      user: 'user-123',
      content: 'This is a nested reply',
      parentId: 'parent-id-3', // Should use the last parent ID
      createdAt: expect.anything(),
    })
  })

  it('should handle insert failure', async () => {
    mockReadBody.mockResolvedValueOnce({
      comment: 'Failed comment',
      parentIds: null,
      module: 'test-module',
    })

    // Simulate a failed insert by returning empty array
    mockDb.returning.mockReset()
    mockDb.returning.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({
      status: 500,
      message: 'Failed to insert comment',
    })
  })

  it('should handle database errors gracefully', async () => {
    mockReadBody.mockResolvedValueOnce({
      comment: 'Error comment',
      parentIds: null,
      module: 'test-module',
    })

    // Simulate a database error
    mockDb.values.mockImplementationOnce(() => {
      throw new Error('Database error')
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 500,
      message: 'Database error',
    })
  })
})
