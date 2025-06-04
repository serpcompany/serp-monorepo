import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockCreateError, mockDb, mockGetQuery } from '../../../../setup'

describe('entities Search API', () => {
  let handler

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    // Reset mockDb.execute
    mockDb.execute.mockReset()
    mockDb.execute.mockImplementation(() => [])

    // Reset mockCreateError for proper error testing
    mockCreateError.mockImplementation((options) => {
      const error = new Error(options.message)
      error.statusCode = options.statusCode
      return error
    })

    handler = (await import('../../../../../server/api/entities/search'))
      .default
  })

  it('should return search results when valid parameters are provided', async () => {
    // Setup query with search text
    mockGetQuery.mockReturnValue({
      searchText: 'test query',
      module: 'test-module',
      page: 1,
      limit: 10,
    })

    // Mock database response for SQL search query
    mockDb.execute.mockResolvedValueOnce([
      { id: 1, name: 'Test Entity 1', slug: 'test-entity-1' },
      { id: 2, name: 'Test Entity 2', slug: 'test-entity-2' },
    ])

    // Call the handler
    const results = await handler({})

    // Verify the returned search results
    expect(results).toHaveLength(2)
    expect(results[0].id).toBe(1)
    expect(results[0].name).toBe('Test Entity 1')
    expect(results[1].id).toBe(2)

    // Verify SQL execution was called correctly
    expect(mockDb.execute).toHaveBeenCalledTimes(1)
  })

  it('should handle empty search results', async () => {
    // Setup query with search text
    mockGetQuery.mockReturnValue({
      searchText: 'nonexistent',
      module: 'test-module',
      page: 1,
      limit: 10,
    })

    // Mock empty search results
    mockDb.execute.mockResolvedValueOnce([])

    // Call the handler
    const results = await handler({})

    // Verify empty results array is returned
    expect(results).toEqual([])

    // Verify SQL execution was called
    expect(mockDb.execute).toHaveBeenCalledTimes(1)
  })

  it('should throw error if searchText is missing', async () => {
    // Setup query without search text
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      page: 1,
      limit: 10,
    })

    // Call the handler and expect it to throw
    try {
      await handler({})
      // If we get here, test should fail
      expect(true).toBe(false)
    }
    catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'Search text is required.',
      })
    }

    // Verify SQL execution was not called
    expect(mockDb.execute).not.toHaveBeenCalled()
  })

  it('should throw error for invalid page parameter', async () => {
    // Setup query with invalid page
    mockGetQuery.mockReturnValue({
      searchText: 'test',
      module: 'test-module',
      page: 'invalid',
      limit: 10,
    })

    // Call the handler and expect it to throw
    try {
      await handler({})
      expect(true).toBe(false)
    }
    catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'Page must be a positive integer.',
      })
    }

    // Verify SQL execution was not called
    expect(mockDb.execute).not.toHaveBeenCalled()
  })

  it('should throw error for invalid limit parameter', async () => {
    // Setup query with invalid limit
    mockGetQuery.mockReturnValue({
      searchText: 'test',
      module: 'test-module',
      page: 1,
      limit: 'invalid',
    })

    // Call the handler and expect it to throw
    try {
      await handler({})
      expect(true).toBe(false)
    }
    catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'Limit must be a positive integer.',
      })
    }

    // Verify SQL execution was not called
    expect(mockDb.execute).not.toHaveBeenCalled()
  })

  it('should throw error for invalid filter key', async () => {
    // Setup query with invalid filter key
    mockGetQuery.mockReturnValue({
      searchText: 'test',
      module: 'test-module',
      page: 1,
      limit: 10,
      filters: 'invalid-key$:value',
    })

    // Call the handler and expect it to throw
    try {
      await handler({})
      expect(true).toBe(false)
    }
    catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'Bad filter key',
      })
    }

    // Verify SQL execution was not called
    expect(mockDb.execute).not.toHaveBeenCalled()
  })

  it('should handle categorySlug filtering', async () => {
    // Setup query with category filter
    mockGetQuery.mockReturnValue({
      searchText: 'test',
      module: 'test-module',
      categorySlug: 'test-category',
      page: 1,
      limit: 10,
    })

    // Mock search results
    mockDb.execute.mockResolvedValueOnce([
      { id: 1, name: 'Test Entity 1', slug: 'test-entity-1' },
    ])

    // Call the handler
    const results = await handler({})

    // Verify results
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe(1)

    // Verify SQL execution was called with category filter
    expect(mockDb.execute).toHaveBeenCalledTimes(1)
    // The actual SQL query is complex, but we just verify execution was called
  })

  it('should handle database errors gracefully', async () => {
    // Setup query
    mockGetQuery.mockReturnValue({
      searchText: 'test',
      module: 'test-module',
      page: 1,
      limit: 10,
    })

    // Mock database error
    mockDb.execute.mockRejectedValueOnce(new Error('Database error'))

    // Call the handler and expect it to throw
    try {
      await handler({})
      expect(true).toBe(false)
    }
    catch (error) {
      expect(mockCreateError).toHaveBeenCalledWith({
        statusCode: 500,
        message: 'Internal Server Error',
      })
    }
  })
})
