import { getDb } from '@serp/db/server/database'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockReadBody } from '../../../setup'

describe('vote Post API', () => {
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
    handler = (await import('../../../../server/api/vote.post')).default
  })

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null })

    const result = await handler({})

    expect(result).toEqual({ status: 401, message: 'Unauthorized' })
  })

  it('should return 400 if ID is missing', async () => {
    mockReadBody.mockResolvedValueOnce({
      direction: 1,
      // Missing id
    })

    const result = await handler({})

    expect(result).toEqual({ status: 400, message: 'ID is required' })
  })

  it('should return 400 if direction is missing', async () => {
    mockReadBody.mockResolvedValueOnce({
      id: 'entity-123',
      // Missing direction
    })

    const result = await handler({})

    expect(result).toEqual({ status: 400, message: 'ID is required' })
  })

  it('should return 400 if direction is invalid', async () => {
    mockReadBody.mockResolvedValueOnce({
      id: 'entity-123',
      direction: 2, // Invalid direction, should be 1 or -1
    })

    const result = await handler({})

    expect(result).toEqual({
      status: 400,
      message: 'Direction must be 1 or -1',
    })
  })

  it('should handle creating a new vote', async () => {
    mockReadBody.mockResolvedValueOnce({
      id: 'entity-123',
      direction: 1,
    })

    // Mock no existing vote
    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({ status: 200, message: 'success' })
    expect(getDb).toHaveBeenCalled()
    expect(mockDb.insert).toHaveBeenCalled()
  })
})
