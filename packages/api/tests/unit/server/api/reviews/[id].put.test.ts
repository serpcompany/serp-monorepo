import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockReadBody } from '../../../../setup'

describe('reviews Put API', () => {
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

    // Import handler
    handler = (await import('../../../../../server/api/reviews/[id].put'))
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
      title: 'Updated Review',
      // Missing content
      rating: '4',
      dateOfExperience: '2023-01-01',
    })

    const result = await handler({})

    expect(result).toEqual({ status: 400, message: 'Missing required fields' })
  })

  it('should return 400 if rating is invalid', async () => {
    mockReadBody.mockResolvedValueOnce({
      title: 'Updated Review',
      content: 'Updated content',
      rating: '6', // Invalid - should be 1-5
      dateOfExperience: '2023-01-01',
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Rating must be an integer between 1 and 5',
    })
  })

  it('should return 404 if review does not exist for update', async () => {
    mockReadBody.mockResolvedValueOnce({
      title: 'Updated Review',
      content: 'Updated content',
      rating: '4',
      dateOfExperience: '2023-01-01',
    })

    // Mock no existing review found
    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({
      status: 404,
      message: 'Review not found for update',
    })
  })

  it('should update review successfully', async () => {
    const updateData = {
      title: 'Updated Review',
      content: 'Updated content',
      rating: '4',
      dateOfExperience: '2023-01-01',
    }

    mockReadBody.mockResolvedValueOnce(updateData)

    // Mock existing review
    mockDb.execute.mockResolvedValueOnce([{ id: 'review-123' }])

    // For the update operation (if needed)
    mockDb.execute.mockResolvedValueOnce([{ success: true }])

    const result = await handler({})

    expect(result).toEqual({ message: 'success' })

    // Verify update was called with correct data
    expect(mockDb.update).toHaveBeenCalled()
    expect(mockDb.set).toHaveBeenCalledWith(
      expect.objectContaining({
        title: updateData.title,
        content: updateData.content,
        rating: 4, // Note: as int
        dateOfExperience: expect.any(Date),
      }),
    )
    expect(mockDb.where).toHaveBeenCalled()
  })

  it('should handle database errors gracefully', async () => {
    const updateData = {
      title: 'Updated Review',
      content: 'Updated content',
      rating: '4',
      dateOfExperience: '2023-01-01',
    }

    mockReadBody.mockResolvedValueOnce(updateData)

    // Mock existing review
    mockDb.execute.mockResolvedValueOnce([{ id: 'review-123' }])

    // Mock update error
    mockDb.where.mockImplementationOnce(() => {
      throw new Error('Database error')
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 500,
      message: 'Database error',
    })
  })
})
