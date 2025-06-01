import { getDb } from '@serp/db/server/database'
import { and, eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockReadBody } from '../../../../setup'

describe('reviews Post API', () => {
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

    // Reset mockDb methods
    mockDb.execute.mockReset()
    mockDb.execute.mockResolvedValue([]) // Default no reviews

    // Import handler
    handler = (await import('../../../../../server/api/reviews/[id].post'))
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
    mockReadBody.mockResolvedValueOnce({
      title: 'Test Review',
      // Missing content
      rating: '5',
      dateOfExperience: '2023-01-01',
    })

    const result = await handler({})

    expect(result).toEqual({ status: 400, message: 'Missing required fields' })
  })

  it('should return 400 if rating is invalid', async () => {
    mockReadBody.mockResolvedValueOnce({
      title: 'Test Review',
      content: 'Great experience!',
      rating: '6', // Invalid - should be 1-5
      dateOfExperience: '2023-01-01',
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Rating must be an integer between 1 and 5',
    })
  })

  it('should return 400 if review already exists', async () => {
    mockReadBody.mockResolvedValueOnce({
      title: 'Test Review',
      content: 'Great experience!',
      rating: '4',
      dateOfExperience: '2023-01-01',
    })

    // Mock first execute call to return an existing review
    mockDb.execute.mockResolvedValueOnce([{ id: 'review-123' }])

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Review already exists, use PUT to update',
    })
  })

  it('should create a new review successfully', async () => {
    const reviewData = {
      title: 'Test Review',
      content: 'Great experience!',
      rating: '4',
      dateOfExperience: '2023-01-01',
    }

    mockReadBody.mockResolvedValueOnce(reviewData)

    // Mock no existing review
    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({ message: 'success' })

    // Verify insert was called with correct data
    expect(mockDb.insert).toHaveBeenCalled()
    expect(mockDb.values).toHaveBeenCalledWith(
      expect.objectContaining({
        title: reviewData.title,
        content: reviewData.content,
        rating: 4, // Note: as int
        entity: 'entity-123',
        user: 'user-123',
      }),
    )
  })

  it('should handle database errors gracefully', async () => {
    const reviewData = {
      title: 'Test Review',
      content: 'Great experience!',
      rating: '4',
      dateOfExperience: '2023-01-01',
    }

    mockReadBody.mockResolvedValueOnce(reviewData)

    // Mock no existing review
    mockDb.execute.mockResolvedValueOnce([])

    // Mock insert error
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
