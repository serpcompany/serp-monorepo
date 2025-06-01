import { getDb } from '@serp/db/server/database'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  mockCreateError,
  mockDb,
  mockGetQuery,
  mockGetRouterParam,
} from '../../../../setup'

const mockAddToCache = vi.fn()
let cacheValue = null
vi.mock('#nuxt-multi-cache/composables', () => ({
  useDataCache: vi.fn().mockImplementation(() => ({
    value: cacheValue,
    addToCache: mockAddToCache,
  })),
}))

describe('entity API', () => {
  let handler

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()
    cacheValue = null

    mockCreateError.mockImplementation((options) => {
      const error = new Error(options.message)
      error.statusCode = options.statusCode
      throw error
    })

    handler = (await import('../../../../../server/api/entity/[slug]')).default
  })

  it('should return entity from cache when available', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' })
    mockGetRouterParam.mockReturnValue('cached-entity')

    cacheValue = {
      id: 1,
      name: 'Cached Entity',
      slug: 'cached-entity',
      module: 'test-module',
    }

    const mockAggregateData = {
      entityId: 1,
      numUpvotes: 10,
      numDownvotes: 2,
      averageRating: 4.5,
    }
    mockDb.execute.mockResolvedValueOnce([mockAggregateData])
    mockDb.execute.mockResolvedValueOnce([{ direction: 'up' }])
    mockDb.execute.mockResolvedValueOnce([{ user: 'verifier-123' }])

    const result = await handler({})

    expect(result).toHaveProperty('id', 1)
    expect(result).toHaveProperty('name', 'Cached Entity')
    expect(result).toHaveProperty('numUpvotes', 10)
    expect(result).toHaveProperty('numDownvotes', 2)
    expect(result).toHaveProperty('usersCurrentVote', 'up')
    expect(result).toHaveProperty('verification', 'verifier-123')
  })

  it('should fetch entity from database when not in cache', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' })
    mockGetRouterParam.mockReturnValue('test-entity')

    const mockEntity = {
      id: 1,
      name: 'Test Entity',
      slug: 'test-entity',
      data: { description: 'Test description' },
      singleData: { featured: true },
      categories: ['category1'],
      topics: ['topic1'],
      createdAt: new Date(),
      updatedAt: new Date(),
      module: 'test-module',
      numReviews: 5,
      numUpvotes: 10,
      numDownvotes: 2,
      averageRating: 4.5,
      usersCurrentVote: 'up',
      verification: 'verifier-123',
    }

    mockDb.execute.mockResolvedValueOnce([mockEntity])

    const result = await handler({})

    expect(result).toHaveProperty('id', 1)
    expect(result).toHaveProperty('name', 'Test Entity')
    expect(result).toHaveProperty('numUpvotes', 10)
    expect(mockAddToCache).toHaveBeenCalled()
  })

  it('should handle entity not found', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' })
    mockGetRouterParam.mockReturnValue('non-existent')

    mockDb.execute.mockResolvedValueOnce([])

    await expect(handler({})).rejects.toThrow('Internal Server Error')

    expect(mockCreateError).toHaveBeenCalledWith({
      statusCode: 404,
      message: 'Entity not found',
    })
  })

  it('should handle query with filters', async () => {
    mockGetQuery.mockReturnValue({
      module: 'test-module',
      filters: 'category:games,year:2023',
    })
    mockGetRouterParam.mockReturnValue('filtered-entity')

    const mockFilteredEntity = {
      id: 2,
      name: 'Filtered Entity',
      slug: 'filtered-entity',
      data: { category: 'games', year: 2023 },
      singleData: {},
      module: 'test-module',
    }
    mockDb.execute.mockResolvedValueOnce([mockFilteredEntity])

    const result = await handler({})

    expect(mockDb.where).toHaveBeenCalled()
    expect(result).toHaveProperty('id', 2)
    expect(result).toHaveProperty('name', 'Filtered Entity')
  })
})
