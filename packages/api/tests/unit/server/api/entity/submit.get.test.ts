import { getDb } from '@serp/db/server/database'
import { and, eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockGetQuery } from '../../../../setup'

describe('entity Submit Get API', () => {
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

    // Reset mockGetQuery to prevent test leakage
    mockGetQuery.mockReset()

    // Import handler
    handler = (await import('../../../../../server/api/entity/submit.get'))
      .default
  })

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null })
    mockGetQuery.mockReturnValue({ module: 'test-module' })

    const result = await handler({})

    expect(result).toEqual({ status: 401, message: 'Unauthorized' })
  })

  it('should fetch all submissions for a user when no ID is provided', async () => {
    const module = 'test-module'
    mockGetQuery.mockReturnValue({ module })

    const mockSubmissions = [
      {
        id: 1,
        uuid: 'uuid-1',
        isPriority: false,
        status: 'pending',
        createdAt: new Date(),
        reviewedAt: null,
        reviewedBy: null,
        reviewNotes: null,
        backlinkVerified: false,
        backlinkVerifiedAt: null,
      },
      {
        id: 2,
        uuid: 'uuid-2',
        isPriority: true,
        status: 'approved',
        createdAt: new Date(),
        reviewedAt: new Date(),
        reviewedBy: 'admin-1',
        reviewNotes: 'Good submission',
        backlinkVerified: true,
        backlinkVerifiedAt: new Date(),
      },
    ]

    mockDb.execute.mockResolvedValueOnce(mockSubmissions)

    const result = await handler({})

    expect(result).toEqual(mockSubmissions)
    expect(mockDb.select).toHaveBeenCalled()
    expect(mockDb.from).toHaveBeenCalled()
    expect(mockDb.where).toHaveBeenCalled()
    expect(and).toHaveBeenCalled()
    expect(eq).toHaveBeenCalledWith(expect.anything(), 'user-123')
    expect(eq).toHaveBeenCalledWith(expect.anything(), module)
  })

  it('should fetch a specific submission when ID is provided', async () => {
    const module = 'test-module'
    const id = '123'
    mockGetQuery.mockReturnValue({ module, id })

    const mockSubmission = {
      id: 123,
      uuid: 'uuid-123',
      isPriority: true,
      status: 'pending',
      formData: JSON.stringify({ name: 'Test Entity' }),
      createdAt: new Date(),
      reviewedAt: null,
      reviewedBy: null,
      reviewNotes: null,
      backlinkVerified: false,
      backlinkVerifiedAt: null,
    }

    mockDb.execute.mockResolvedValueOnce([mockSubmission])

    const result = await handler({})

    expect(result).toEqual(mockSubmission)
    expect(mockDb.select).toHaveBeenCalled()
    expect(mockDb.from).toHaveBeenCalled()
    expect(mockDb.where).toHaveBeenCalled()
    expect(and).toHaveBeenCalled()
    expect(eq).toHaveBeenCalledWith(expect.anything(), 'user-123')
    expect(eq).toHaveBeenCalledWith(expect.anything(), id)
    expect(eq).toHaveBeenCalledWith(expect.anything(), module)
  })

  it('should return null when specific submission is not found', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      id: '999',
    })

    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toBeNull()
  })

  it('should handle database errors gracefully', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' })

    // Simulate a database error
    const dbError = new Error('Database error')
    mockDb.execute.mockRejectedValueOnce(dbError)

    const result = await handler({})

    expect(result).toEqual({
      status: 500,
      message: 'Database error',
    })
  })
})
