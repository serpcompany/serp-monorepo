import { getDb } from '@serp/db/server/database'
import { and, eq, sql } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockGetQuery, mockReadBody } from '../../../../setup'

describe('entity Edit Put API', () => {
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
    handler = (await import('../../../../../server/api/entity/edit.put'))
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

  it('should return 404 if edit is not found', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })

    // Edit not found
    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({ status: 404, message: 'Edit not found' })
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), 123))
  })

  it('should return 403 if user is not verified for the entity', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })

    // Edit found
    mockDb.execute.mockResolvedValueOnce([{ entity: 456 }])

    // No verification found
    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({
      status: 403,
      message: 'You are not verified to review edits for this company',
    })
    expect(mockDb.where).toHaveBeenCalledWith(
      and(eq(expect.anything(), 456), eq(expect.anything(), 'user-123')),
    )
  })

  it('should return 400 if no valid fields to update', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })

    // Edit found
    mockDb.execute.mockResolvedValueOnce([{ entity: 456 }])

    // Verification found
    mockDb.execute.mockResolvedValueOnce([{ id: 'verification-123' }])

    // Empty body
    mockReadBody.mockResolvedValueOnce({})

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Nothing to update; allowed fields: status, reviewNotes',
    })
  })

  it('should successfully update an edit with status only', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })

    // Edit found
    mockDb.execute.mockResolvedValueOnce([{ entity: 456 }])

    // Verification found
    mockDb.execute.mockResolvedValueOnce([{ id: 'verification-123' }])

    // Body with status only
    mockReadBody.mockResolvedValueOnce({
      status: 'rejected',
    })

    const result = await handler({})

    expect(result).toEqual({ message: 'success' })
    expect(mockDb.update).toHaveBeenCalled()
    expect(mockDb.set).toHaveBeenCalledWith({
      status: 'rejected',
      reviewedBy: 'user-123',
      reviewedAt: expect.anything(),
    })
    expect(mockDb.where).toHaveBeenCalledWith(eq(expect.anything(), 123))
  })

  it('should successfully update an edit with review notes only', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })

    // Edit found
    mockDb.execute.mockResolvedValueOnce([{ entity: 456 }])

    // Verification found
    mockDb.execute.mockResolvedValueOnce([{ id: 'verification-123' }])

    // Body with reviewNotes only
    mockReadBody.mockResolvedValueOnce({
      reviewNotes: 'These changes look good',
    })

    const result = await handler({})

    expect(result).toEqual({ message: 'success' })
    expect(mockDb.update).toHaveBeenCalled()
    expect(mockDb.set).toHaveBeenCalledWith({
      reviewNotes: 'These changes look good',
      reviewedBy: 'user-123',
      reviewedAt: expect.anything(),
    })
  })

  it('should successfully update with both status and review notes', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })

    // Edit found
    mockDb.execute.mockResolvedValueOnce([{ entity: 456 }])

    // Verification found
    mockDb.execute.mockResolvedValueOnce([{ id: 'verification-123' }])

    // Body with both status and reviewNotes
    mockReadBody.mockResolvedValueOnce({
      status: 'rejected',
      reviewNotes: 'Approved with some minor changes',
    })

    const result = await handler({})

    expect(result).toEqual({ message: 'success' })
    expect(mockDb.update).toHaveBeenCalled()
    expect(mockDb.set).toHaveBeenCalledWith({
      status: 'rejected',
      reviewNotes: 'Approved with some minor changes',
      reviewedBy: 'user-123',
      reviewedAt: expect.anything(),
    })
  })

  it('should process changes correctly', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })

    // Edit found
    mockDb.execute.mockResolvedValueOnce([{ entity: 456 }])

    // Verification found
    mockDb.execute.mockResolvedValueOnce([{ id: 'verification-123' }])

    // Body with status
    mockReadBody.mockResolvedValueOnce({
      status: 'rejected',
    })

    const result = await handler({})

    expect(result).toEqual({ message: 'success' })
    // Verify the update was called
    expect(mockDb.update).toHaveBeenCalled()
    expect(mockDb.set).toHaveBeenCalledWith({
      status: 'rejected',
      reviewedBy: 'user-123',
      reviewedAt: expect.anything(),
    })
  })

  it('should handle error conditions gracefully', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })

    // Edit found
    mockDb.execute.mockResolvedValueOnce([{ entity: 456 }])

    // Verification found
    mockDb.execute.mockResolvedValueOnce([{ id: 'verification-123' }])

    // Body with status
    mockReadBody.mockResolvedValueOnce({
      status: 'rejected',
    })

    // Simulate an error during update
    mockDb.execute.mockImplementationOnce(() => {
      throw new Error('Update failed')
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 500,
      message: 'Update failed',
    })
  })

  it('should handle errors gracefully', async () => {
    mockGetQuery.mockReturnValueOnce({ id: '123' })

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
