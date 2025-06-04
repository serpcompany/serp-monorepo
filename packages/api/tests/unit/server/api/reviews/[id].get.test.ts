import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockGetQuery, mockGetUserSession } from '../../../../setup'

describe('reviews Get API', () => {
  let handler
  let mockGetRouterParams

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    // Setup router params mock
    mockGetRouterParams = vi.fn().mockReturnValue({ id: 'entity-123' })
    globalThis.getRouterParams = mockGetRouterParams

    // Setup default query params
    mockGetQuery.mockReturnValue({ page: '1', pageSize: '10' })

    // Reset mockDb methods
    mockDb.execute.mockReset()

    // Import handler
    handler = (await import('../../../../../server/api/reviews/[id].get'))
      .default
  })

  it('should return 400 if ID is missing', async () => {
    mockGetRouterParams.mockReturnValueOnce({})

    const result = await handler({})

    expect(result).toEqual({ status: 400, message: 'ID is required' })
  })

  it('should return reviews with pagination data', async () => {
    // Mock reviews data
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 'review-1',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
        content: 'Great product!',
        rating: 5,
        dateOfExperience: new Date('2022-12-20'),
        user: {
          id: 'user-456',
          name: 'John Doe',
          image: 'profile.jpg',
        },
        isFlagged: false,
        flaggedAt: null,
        flaggedReason: null,
        flaggedBy: null,
      },
      {
        id: 'review-2',
        createdAt: new Date('2023-01-02'),
        updatedAt: new Date('2023-01-02'),
        content: 'Good but could be better',
        rating: 4,
        dateOfExperience: new Date('2022-12-25'),
        user: {
          id: 'user-789',
          name: 'Jane Smith',
          image: 'avatar.png',
        },
        isFlagged: false,
        flaggedAt: null,
        flaggedReason: null,
        flaggedBy: null,
      },
    ])

    // Mock total count
    mockDb.execute.mockResolvedValueOnce([{ total: 2 }])

    // Mock no user review (empty array)
    mockDb.execute.mockResolvedValueOnce([])

    // Call the handler
    const result = await handler({})

    // Verify response shape and data
    expect(result.reviews).toHaveLength(2)
    expect(result.reviews[0].id).toBe('review-1')
    expect(result.reviews[0].rating).toBe(5)
    expect(result.reviews[0].user.name).toBe('John Doe')

    expect(result.pagination).toEqual({
      currentPage: 1,
      pageSize: 10,
      totalItems: 2,
    })

    expect(result.userReview).toBeNull()

    // Verify DB was queried properly
    expect(mockDb.execute).toHaveBeenCalledTimes(3)
  })

  it('should include user review when user is authenticated', async () => {
    // Setup authenticated user
    mockGetUserSession.mockResolvedValueOnce({
      user: {
        siteId: 'user-123',
        id: 'user-123',
        name: 'Current User',
        image: 'current-user.jpg',
      },
    })

    // Mock reviews from other users
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 'review-1',
        createdAt: new Date('2023-01-01'),
        content: 'Great product!',
        rating: 5,
        user: {
          id: 'user-456',
          name: 'Other User',
          image: 'other.jpg',
        },
      },
    ])

    // Mock total count
    mockDb.execute.mockResolvedValueOnce([{ total: 2 }])

    // Mock user's own review
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 'review-2',
        createdAt: new Date('2023-01-02'),
        content: 'My personal review',
        rating: 4,
        user: 'user-123', // Note this is just the ID as per the code
      },
    ])

    // Call the handler
    const result = await handler({})

    // Verify user review is included
    expect(result.userReview).toBeDefined()
    expect(result.userReview.id).toBe('review-2')
    expect(result.userReview.rating).toBe(4)
    expect(result.userReview.user.name).toBe('Current User')

    // Verify reviews array doesn't include user's own review
    expect(result.reviews).toHaveLength(1)
    expect(result.reviews[0].id).toBe('review-1')

    // Verify DB was queried properly
    expect(mockDb.execute).toHaveBeenCalledTimes(3)
  })

  it('should handle database errors gracefully', async () => {
    // Mock database error
    mockDb.execute.mockRejectedValueOnce(new Error('Database error'))

    // Call the handler
    const result = await handler({})

    // Verify error response
    expect(result).toEqual({
      status: 500,
      message: 'Database error',
    })

    // Verify only one DB call was attempted
    expect(mockDb.execute).toHaveBeenCalledTimes(1)
  })

  it('should handle pagination parameters correctly', async () => {
    // Setup pagination query params
    mockGetQuery.mockReturnValueOnce({ page: '2', pageSize: '5' })

    // Mock reviews data for page 2
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 'review-3',
        createdAt: new Date('2023-01-03'),
        content: 'Page 2 review',
        rating: 3,
        user: {
          id: 'user-555',
          name: 'Page Two User',
          image: null,
        },
      },
    ])

    // Mock total count - total of 6 reviews to have multiple pages
    mockDb.execute.mockResolvedValueOnce([{ total: 6 }])

    // Mock no user review
    mockDb.execute.mockResolvedValueOnce([])

    // Call the handler
    const result = await handler({})

    // Verify pagination in response
    expect(result.pagination).toEqual({
      currentPage: 2,
      pageSize: 5,
      totalItems: 6,
    })

    // Verify we have the page 2 data
    expect(result.reviews).toHaveLength(1)
    expect(result.reviews[0].id).toBe('review-3')

    // Verify DB was queried with correct offset and limit
    // (This would be more precise if we could inspect query parameters)
    expect(mockDb.limit).toHaveBeenCalledWith(5)
    expect(mockDb.offset).toHaveBeenCalledWith(5) // (2-1) * 5 = 5
  })
})
