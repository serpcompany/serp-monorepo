import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockGetQuery, mockReadBody } from '../../../../setup'

describe('entity Edit Post API', () => {
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

    // Import handler
    handler = (await import('../../../../../server/api/entity/edit.post'))
      .default
  })

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null })

    const result = await handler({})

    expect(result).toEqual({ status: 401, message: 'Unauthorized' })
  })

  it('should return 400 if edit ID is missing', async () => {
    mockGetQuery.mockReturnValueOnce({})

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Missing edit ID in query',
    })
  })

  it('should return 400 if edit ID is invalid', async () => {
    mockGetQuery.mockReturnValueOnce({ id: 'not-a-number' })

    const result = await handler({})

    expect(result).toEqual({ status: 400, message: 'Invalid edit ID' })
  })

  it('should return 400 if no data is provided', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })
    mockReadBody.mockResolvedValueOnce({})

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Validation error: At least one field must be provided for edit',
    })
  })

  it('should return 400 if categories is not an array', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })
    mockReadBody.mockResolvedValueOnce({
      categories: {}, // Not a string or array
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Validation error: Expected array, received object',
    })
  })

  it('should return 400 if invalid categories are provided', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })
    mockReadBody.mockResolvedValueOnce({
      categories: ['cat1', 'cat2', 'cat3'], // Strings instead of numbers
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Validation error: Expected number, received string, Expected number, received string, Expected number, received string',
    })
  })

  it('should return 400 if topics is not an array', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })
    mockReadBody.mockResolvedValueOnce({
      topics: {}, // Not a string or array
    })

    const result = await handler({})

    expect(result).toEqual({ status: 400, message: 'Validation error: Expected array, received object' })
  })

  it('should return 400 if invalid topics are provided', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })
    mockReadBody.mockResolvedValueOnce({
      topics: ['topic1', 'topic2', 'topic3'], // Strings instead of numbers
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Validation error: Expected number, received string, Expected number, received string, Expected number, received string',
    })
  })

  it('should return 400 if entity does not exist', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })
    mockReadBody.mockResolvedValueOnce({
      name: 'Updated Name',
    })

    // Mock that entity doesn't exist
    mockDb.execute.mockResolvedValueOnce([]) // First call for entity check

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Entity with given id doesn\'t exists',
    })
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), 123))
  })

  it('should successfully create an edit request', async () => {
    const entityId = 123
    const userId = 'user-123'

    mockGetQuery.mockReturnValueOnce({ id: entityId.toString() })
    const requestData = {
      name: 'Updated Name',
      description: 'Updated Description',
    }
    mockReadBody.mockResolvedValueOnce(requestData)

    // Mock that entity exists
    mockDb.execute.mockResolvedValueOnce([{ id: entityId }])

    // Mock insert
    mockDb.execute.mockResolvedValueOnce([{ id: 'new-edit-id' }])

    const result = await handler({})

    expect(result).toEqual({ message: 'success' })
    expect(mockDb.insert).toHaveBeenCalled()
    expect(mockDb.values).toHaveBeenCalledWith({
      user: userId,
      entity: entityId,
      proposedChanges: JSON.stringify(requestData),
      status: 'pending',
    })
    expect(mockDb.onConflictDoNothing).toHaveBeenCalled()
  })

  it('should handle errors gracefully', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })
    mockReadBody.mockResolvedValueOnce({ name: 'Test Entity' })

    // Simulate a database error when checking entity exists
    mockDb.execute.mockRejectedValueOnce(new Error('Database error'))

    const result = await handler({})

    expect(result).toEqual({
      status: 500,
      message: 'Database error',
    })
  })

  describe('validation Tests', () => {
    it('should reject invalid field types', async () => {
      mockGetQuery.mockReturnValueOnce({ id: '123' })
      mockReadBody.mockResolvedValueOnce({
        name: 123, // Should be string
        description: true, // Should be string
      })

      const result = await handler({})

      expect(result.status).toBe(400)
      expect(result.message).toContain('Validation error')
    })

    it('should reject empty strings for required fields', async () => {
      mockGetQuery.mockReturnValueOnce({ id: '123' })
      mockReadBody.mockResolvedValueOnce({
        name: '', // Empty string
      })

      const result = await handler({})

      expect(result.status).toBe(400)
      expect(result.message).toContain('String must contain at least 1 character')
    })

    it('should reject fields that exceed max length', async () => {
      mockGetQuery.mockReturnValueOnce({ id: '123' })
      mockReadBody.mockResolvedValueOnce({
        name: 'a'.repeat(256), // Exceeds 255 char limit
      })

      const result = await handler({})

      expect(result.status).toBe(400)
      expect(result.message).toContain('String must contain at most 255 character')
    })

    it('should reject invalid URLs', async () => {
      mockGetQuery.mockReturnValueOnce({ id: '123' })
      mockReadBody.mockResolvedValueOnce({
        website: 'not-a-url',
        logo: 'also-not-a-url',
      })

      const result = await handler({})

      expect(result.status).toBe(400)
      expect(result.message).toContain('Invalid url')
    })

    it('should reject invalid email format', async () => {
      mockGetQuery.mockReturnValueOnce({ id: '123' })
      mockReadBody.mockResolvedValueOnce({
        email: 'invalid-email',
      })

      const result = await handler({})

      expect(result.status).toBe(400)
      expect(result.message).toContain('Invalid email')
    })

    it('should reject non-positive category IDs', async () => {
      mockGetQuery.mockReturnValueOnce({ id: '123' })
      mockReadBody.mockResolvedValueOnce({
        categories: [0, -1, 2], // 0 and negative not allowed
      })

      const result = await handler({})

      expect(result.status).toBe(400)
      expect(result.message).toContain('Number must be greater than 0')
    })

    it('should reject unknown fields', async () => {
      mockGetQuery.mockReturnValueOnce({ id: '123' })
      mockReadBody.mockResolvedValueOnce({
        name: 'Valid Name',
        unknownField: 'should not be here',
      })

      const result = await handler({})

      expect(result.status).toBe(400)
      expect(result.message).toContain('Unrecognized key')
    })

    it('should accept valid edit data', async () => {
      mockGetQuery.mockReturnValueOnce({ id: '123' })
      mockReadBody.mockResolvedValueOnce({
        name: 'Valid Company Name',
        description: 'A valid description',
        website: 'https://example.com',
        email: 'contact@example.com',
        logo: 'https://example.com/logo.png',
        categories: [1, 2, 3],
        topics: [4, 5, 6],
      })

      // Mock that categories exist
      mockDb.execute.mockResolvedValueOnce([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ])

      // Mock that topics exist
      mockDb.execute.mockResolvedValueOnce([
        { id: 4 },
        { id: 5 },
        { id: 6 },
      ])

      // Mock that entity exists
      mockDb.execute.mockResolvedValueOnce([{ id: 123 }])

      // Mock insert
      mockDb.execute.mockResolvedValueOnce([{ id: 'new-edit-id' }])

      const result = await handler({})

      expect(result).toEqual({ message: 'success' })
    })
  })
})
