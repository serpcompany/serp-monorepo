import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockGetQuery } from '../../../../setup'

describe('entities All-For-Category API', () => {
  let handler

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    // Reset mockDb.execute
    mockDb.execute.mockReset()

    handler = (
      await import('../../../../../server/api/entities/all-for-category')
    ).default
  })

  it('should return entities for a specific category and module', async () => {
    // Setup query
    mockGetQuery.mockReturnValue({
      categorySlug: 'test-category',
      module: 'test-module',
    })

    // Mock first query for entities
    mockDb.execute.mockResolvedValueOnce([
      { id: 1, slug: 'entity-1' },
      { id: 2, slug: 'entity-2' },
      { id: 3, slug: 'entity-3' },
    ])

    // Mock second query for featured subscription placements
    mockDb.execute.mockResolvedValueOnce([
      { placement: 1, entityId: 2, reservationExpiresAt: null },
    ])

    // Call the handler
    const result = await handler({})

    // Verify the returned entity list excludes the featured entity
    expect(result.entities).toEqual([
      { id: 1, slug: 'entity-1' },
      { id: 3, slug: 'entity-3' },
    ])

    // Verify available placements (placements 2-5 should be available)
    expect(result.availablePlacements).toEqual([2, 3, 4, 5])

    // Verify DB was queried correctly
    expect(mockDb.execute).toHaveBeenCalledTimes(2)
  })

  it('should handle multiple modules', async () => {
    // Setup query with multiple modules
    mockGetQuery.mockReturnValue({
      categorySlug: 'test-category',
      module: 'module1,module2',
    })

    // Mock entities query result
    mockDb.execute.mockResolvedValueOnce([
      { id: 1, slug: 'entity-1' }, // module1
      { id: 4, slug: 'entity-4' }, // module2
    ])

    // Mock featured placements query result (empty for this test)
    mockDb.execute.mockResolvedValueOnce([])

    // Call the handler
    const result = await handler({})

    // Verify all entities are returned since none are featured
    expect(result.entities).toEqual([
      { id: 1, slug: 'entity-1' },
      { id: 4, slug: 'entity-4' },
    ])

    // All placements should be available
    expect(result.availablePlacements).toEqual([1, 2, 3, 4, 5])

    // Verify DB was queried correctly
    expect(mockDb.execute).toHaveBeenCalledTimes(2)
  })

  it('should handle empty entities result', async () => {
    // Setup query
    mockGetQuery.mockReturnValue({
      categorySlug: 'nonexistent-category',
      module: 'test-module',
    })

    // Mock empty entities result
    mockDb.execute.mockResolvedValueOnce([])

    // Mock empty placements
    mockDb.execute.mockResolvedValueOnce([])

    // Call the handler
    const result = await handler({})

    // Should return empty entities array
    expect(result.entities).toEqual([])

    // All placements should be available
    expect(result.availablePlacements).toEqual([1, 2, 3, 4, 5])

    // Verify DB was queried correctly
    expect(mockDb.execute).toHaveBeenCalledTimes(2)
  })

  it('should handle all placements being used', async () => {
    // Setup query
    mockGetQuery.mockReturnValue({
      categorySlug: 'test-category',
      module: 'test-module',
    })

    // Mock entities result
    mockDb.execute.mockResolvedValueOnce([
      { id: 1, slug: 'entity-1' },
      { id: 2, slug: 'entity-2' },
    ])

    // Mock all placements being used
    mockDb.execute.mockResolvedValueOnce([
      { placement: 1, entityId: 3, reservationExpiresAt: null },
      { placement: 2, entityId: 4, reservationExpiresAt: null },
      { placement: 3, entityId: 5, reservationExpiresAt: null },
      { placement: 4, entityId: 6, reservationExpiresAt: null },
      { placement: 5, entityId: 7, reservationExpiresAt: null },
    ])

    // Call the handler
    const result = await handler({})

    // Entities should remain since they don't overlap with featured ones
    expect(result.entities).toEqual([
      { id: 1, slug: 'entity-1' },
      { id: 2, slug: 'entity-2' },
    ])

    // No placements should be available
    expect(result.availablePlacements).toEqual([])

    // Verify DB was queried correctly
    expect(mockDb.execute).toHaveBeenCalledTimes(2)
  })

  it('should handle query without categorySlug', async () => {
    // Setup query with only module
    mockGetQuery.mockReturnValue({ module: 'test-module' })

    // Mock entities result
    mockDb.execute.mockResolvedValueOnce([
      { id: 1, slug: 'entity-1' },
      { id: 2, slug: 'entity-2' },
    ])

    // Mock placements for null category
    mockDb.execute.mockResolvedValueOnce([
      { placement: 1, entityId: 2, reservationExpiresAt: null },
    ])

    // Call the handler
    const result = await handler({})

    // Entity with ID 2 should be removed as it's featured
    expect(result.entities).toEqual([{ id: 1, slug: 'entity-1' }])

    // Placements 2-5 should be available
    expect(result.availablePlacements).toEqual([2, 3, 4, 5])

    // Verify DB was queried correctly
    expect(mockDb.execute).toHaveBeenCalledTimes(2)
  })
})
