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

describe('categories API', () => {
  let handler

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()
    cacheValue = null
    handler = (await import('../../../../server/api/categories')).default
  })

  it('should return categories for a given module', async () => {
    mockGetQuery.mockReturnValue({ module: 'test-module' })

    const mockCategories = [
      {
        id: '1',
        name: 'Category 1',
        slug: 'category-1',
        module: 'test-module',
      },
      {
        id: '2',
        name: 'Category 2',
        slug: 'category-2',
        module: 'test-module',
      },
    ]
    mockDb.execute.mockResolvedValueOnce(mockCategories)

    const result = await handler({})

    expect(getDb).toHaveBeenCalled()
    expect(mockDb.select).toHaveBeenCalled()
    expect(mockDb.from).toHaveBeenCalled()
    expect(mockDb.where).toHaveBeenCalled()
    expect(eq).toHaveBeenCalledWith(expect.anything(), 'test-module')
    expect(result).toEqual(mockCategories)
    expect(mockAddToCache).toHaveBeenCalledWith(
      mockCategories,
      [],
      60 * 60 * 10,
    )
  })

  it('should return results from cache when available', async () => {
    mockGetQuery.mockReturnValue({ module: 'cached-module' })

    cacheValue = [
      {
        id: '3',
        name: 'Cached Category',
        slug: 'cached',
        module: 'cached-module',
      },
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
