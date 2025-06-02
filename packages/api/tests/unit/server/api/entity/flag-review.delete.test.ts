import { getDb } from '@serp/db/server/database'
import { and, eq, sql } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockGetQuery } from '../../../../setup'

describe('entity Flag Review Delete API', () => {
  let handler
  let mockRequireUserSession

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    // Setup mock user session
    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123' },
    })
    globalThis.requireUserSession = mockRequireUserSession

    // Mock SQL function
    vi.mocked(sql).mockImplementation(template => ({ template }))

    // Import handler
    handler = (
      await import('../../../../../server/api/entity/flag-review.delete')
    ).default
  })

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null })

    const result = await handler({})

    expect(result).toEqual({ status: 401, message: 'Unauthorized' })
  })

  it('should return 400 if review ID is missing', async () => {
    mockGetQuery.mockReturnValueOnce({})

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Review ID is required in the query params',
    })
  })

  it('should return 404 if review not found or user not verified for entity', async () => {
    mockGetQuery.mockReturnValueOnce({ id: 'review-123' })

    // Review not found or user not verified for entity
    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({ status: 404, message: 'Review not found' })
    expect(mockDb.where).toHaveBeenCalledWith(
      and(
        eq(expect.anything(), 'review-123'),
        eq(expect.anything(), 'user-123'),
      ),
    )
  })

  it('should successfully unflag a review', async () => {
    const reviewId = 'review-123'

    mockGetQuery.mockReturnValueOnce({ id: reviewId })

    // Review found and user is verified for the entity
    mockDb.execute.mockResolvedValueOnce([{ id: reviewId }])

    const result = await handler({})

    expect(result).toEqual({ message: 'success' })

    // Verify update was called with correct parameters
    expect(mockDb.update).toHaveBeenCalled()
    expect(mockDb.set).toHaveBeenCalledWith({
      updatedAt: expect.anything(),
      isFlagged: false,
      flaggedAt: null,
      flaggedReason: null,
      flaggedBy: null,
      reviewedBy: 'user-123',
      reviewedAt: expect.anything(),
    })
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), reviewId))
  })

  it('should handle errors gracefully', async () => {
    mockGetQuery.mockReturnValueOnce({ id: 'review-123' })

    // Simulate a database error
    mockDb.execute.mockImplementationOnce(() => {
      throw new Error('Database error')
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 500,
      message: 'Database error',
    })
  })
})
