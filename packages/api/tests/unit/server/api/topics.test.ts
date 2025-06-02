import { getDb } from '@serp/db/server/database'
import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockGetQuery } from '../../../setup'

const mockAddToCache = vi.fn()
let cacheValue = null
vi.mock('#nuxt-multi-cache/composables', () => ({
  useDataCache: vi.fn().mockImplementation(() => ({
    value: cacheValue,
    addToCache: mockAddToCache,
  })),
}))

describe('topics API', () => {
  let handler

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()
    cacheValue = null
    handler = (await import('../../../../server/api/topics')).default
  })

  it('should return topics for a given module', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' })

    const mockTopics = [
      { id: '1', name: 'Topic 1', slug: 'topic-1', module: 'test-module' },
      { id: '2', name: 'Topic 2', slug: 'topic-2', module: 'test-module' },
    ]
    mockDb.execute.mockResolvedValueOnce(mockTopics)

    const result = await handler({})

    expect(getDb).toHaveBeenCalled()
    expect(mockDb.select).toHaveBeenCalled()
    expect(mockDb.from).toHaveBeenCalled()
    expect(mockDb.where).toHaveBeenCalled()
    expect(eq).toHaveBeenCalledWith(expect.anything(), 'test-module')
    expect(result).toEqual(mockTopics)
    expect(mockAddToCache).toHaveBeenCalledWith(mockTopics, [], 60 * 60 * 10)
  })

  it('should return results from cache when available', async () => {
    mockGetQuery.mockReturnValue({ module: 'cached-module' })

    cacheValue = [
      { id: '3', name: 'Cached Topic', slug: 'cached', module: 'cached-module' },
    ]

    const result = await handler({})

    expect(mockDb.execute).not.toHaveBeenCalled()
    expect(result).toEqual(cacheValue)
  })

  it('should handle empty module parameter', async () => {
    mockGetQuery.mockReturnValue({ module: '' })
    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(eq).toHaveBeenCalledWith(expect.anything(), '')
    expect(result).toEqual([])
  })
})
