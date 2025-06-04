import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb } from '../../../../setup'

describe('reviews Delete API', () => {
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
    handler = (await import('../../../../../server/api/reviews/[id].delete'))
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

  it('should return 404 if review does not exist for deletion', async () => {
    // Mock no existing review found
    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({
      status: 404,
      message: 'Review not found for deletion',
    })
  })

  it('should delete review successfully', async () => {
    // Mock existing review
    mockDb.execute.mockResolvedValueOnce([{ id: 'review-123' }])

    // For the delete operation
    mockDb.execute.mockResolvedValueOnce([{ success: true }])

    const result = await handler({})

    expect(result).toEqual({ message: 'success' })

    // Verify delete was called with correct ID
    expect(mockDb.delete).toHaveBeenCalledWith(expect.anything())
    expect(mockDb.where).toHaveBeenCalled()
  })

  it('should handle database errors gracefully', async () => {
    // Mock existing review
    mockDb.execute.mockResolvedValueOnce([{ id: 'review-123' }])

    // Mock delete error
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
