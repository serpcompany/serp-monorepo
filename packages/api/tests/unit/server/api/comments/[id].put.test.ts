import { getDb } from '@serp/db/server/database'
import { and, eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockReadBody } from '../../../../setup'

describe('comments Put API', () => {
  let handler
  let mockGetRouterParams
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

    // Mock successful update
    mockDb.returning.mockResolvedValueOnce([{ id: 'updated-comment-id' }])

    // Import handler
    handler = (await import('../../../../../server/api/comments/[id].put'))
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

  it('should return 400 if required fields are missing', async () => {
    // Missing comment
    mockReadBody.mockResolvedValueOnce({
      commentId: 'comment-123',
      timestamp: Date.now(),
      module: 'test-module',
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: '`commentId`, `comment`, and `timestamp` are required',
    })
  })

  it('should return 400 if commentId is missing', async () => {
    mockReadBody.mockResolvedValueOnce({
      comment: 'Updated comment',
      timestamp: Date.now(),
      module: 'test-module',
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: '`commentId`, `comment`, and `timestamp` are required',
    })
  })

  it('should return 400 if timestamp is missing', async () => {
    mockReadBody.mockResolvedValueOnce({
      commentId: 'comment-123',
      comment: 'Updated comment',
      module: 'test-module',
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: '`commentId`, `comment`, and `timestamp` are required',
    })
  })

  it('should update a comment successfully', async () => {
    const updateData = {
      commentId: 'comment-123',
      comment: 'Updated comment text',
      timestamp: Date.now(),
      module: 'test-module',
    }
    mockReadBody.mockResolvedValueOnce(updateData)

    const result = await handler({})

    expect(result).toEqual({
      status: 200,
      message: 'success',
      id: 'updated-comment-id',
    })
    expect(getDb).toHaveBeenCalled()
    expect(mockDb.update).toHaveBeenCalled()
    expect(mockDb.set).toHaveBeenCalledWith({
      content: 'Updated comment text',
      updatedAt: expect.any(Date),
    })
    expect(mockDb.where).toHaveBeenCalled()
    expect(and).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
    )
    expect(eq).toHaveBeenCalledWith(expect.anything(), 'comment-123')
    expect(eq).toHaveBeenCalledWith(expect.anything(), 'user-123')
    expect(eq).toHaveBeenCalledWith(expect.anything(), 'entity-123')
    expect(mockDb.returning).toHaveBeenCalled()
  })

  it('should handle update failure', async () => {
    mockReadBody.mockResolvedValueOnce({
      commentId: 'comment-123',
      comment: 'Updated comment',
      timestamp: Date.now(),
      module: 'test-module',
    })

    // Simulate a failed update by returning empty array
    mockDb.returning.mockReset()
    mockDb.returning.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({
      status: 500,
      message: 'Failed to update comment',
    })
  })

  it('should handle database errors gracefully', async () => {
    mockReadBody.mockResolvedValueOnce({
      commentId: 'comment-123',
      comment: 'Updated comment',
      timestamp: Date.now(),
      module: 'test-module',
    })

    // Simulate a database error
    mockDb.update.mockImplementationOnce(() => {
      throw new Error('Database error')
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 500,
      message: 'Database error',
    })
  })
})
