import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mockDb, mockGetQuery } from '../../../../setup'

// Mock sendSlackNotification
vi.mock('@serp/notifications/server', () => ({
  sendSlackNotification: vi.fn().mockResolvedValue(true),
}))

const mockLinks = []
vi.mock('cheerio', () => ({
  load: vi.fn().mockImplementation((_html) => {
    function $(_selector) {
      return {
        filter: (_filterFn) => {
          return {
            map: (_, _mapFn) => ({
              get: () => mockLinks,
            }),
          }
        },
        attr: _attrName => '',
      }
    }
    $.attr = () => ''
    return $
  }),
}))

// Mock global fetch
globalThis.fetch = vi.fn()

describe('entity Submit Verify Backlink API', () => {
  let handler
  let mockRequireUserSession

  beforeEach(async () => {
    vi.resetModules()
    vi.clearAllMocks()

    // Reset mockLinks array
    mockLinks.length = 0

    // Setup mock user session
    mockRequireUserSession = vi.fn().mockResolvedValue({
      user: { siteId: 'user-123', id: 'user-123' },
    })
    globalThis.requireUserSession = mockRequireUserSession

    // Reset mocks to prevent test leakage
    mockGetQuery.mockReset()

    // Setup fetch mock
    globalThis.fetch.mockReset()
    globalThis.fetch.mockResolvedValue({
      text: vi
        .fn()
        .mockResolvedValue(
          '<html><body><a href="https://example.com">Link</a></body></html>',
        ),
    })

    // Set environment variables
    process.env.NODE_ENV = 'production'
    process.env.NUXT_PUBLIC_DOMAIN = 'serp.co'

    // Import handler
    const { default: handlerModule } = await import(
      '../../../../../server/api/entity/submit-verify-backlink.post'
    )
    handler = handlerModule
  })

  afterEach(() => {
    // Reset environment variables
    delete process.env.NODE_ENV
    delete process.env.NUXT_PUBLIC_DOMAIN
  })

  it('should return 401 if user is not authenticated', async () => {
    mockRequireUserSession.mockResolvedValueOnce({ user: null })

    const result = await handler({})

    expect(result).toEqual({ status: 401, message: 'Unauthorized' })
  })

  it('should return error if no matching record found', async () => {
    mockGetQuery.mockReturnValue({
      id: '123',
      module: 'test-module',
    })

    // No records found
    mockDb.execute.mockResolvedValueOnce([])

    const result = await handler({})

    expect(result).toEqual({
      ok: false,
      error: 'No matching record found',
    })
  })

  it('should return verified:true if backlink is already verified', async () => {
    mockGetQuery.mockReturnValue({
      id: '123',
      module: 'test-module',
    })

    // Record with backlink already verified
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 123,
        entity: 1,
        slug: 'test-entity.com',
        backlinkVerified: true,
      },
    ])

    const result = await handler({})

    expect(result).toEqual({
      ok: true,
      verified: true,
    })
  })

  it('should return error if homepage fetch fails', async () => {
    mockGetQuery.mockReturnValue({
      id: '123',
      module: 'test-module',
    })

    // Record exists but not verified
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 123,
        entity: 1,
        slug: 'test-entity.com',
        backlinkVerified: false,
      },
    ])

    // Fetch fails
    globalThis.fetch.mockRejectedValueOnce(new Error('Network error'))

    const result = await handler({})

    expect(result).toEqual({
      ok: false,
      error: 'Could not fetch homepage',
    })
  })

  it('should verify backlink when valid link is found', async () => {
    mockGetQuery.mockReturnValue({
      id: '123',
      module: 'test-module',
    })

    // Record exists but not verified
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 123,
        entity: 1,
        slug: 'test-entity.com',
        backlinkVerified: false,
      },
    ])

    // Fetch succeeds
    globalThis.fetch.mockResolvedValueOnce({
      text: vi
        .fn()
        .mockResolvedValue(
          '<html><body><a href="https://serp.co">Backlink</a></body></html>',
        ),
    })

    // Set up mock links to include our verification domain
    mockLinks.push('https://serp.co')

    // Verify succeeds
    mockDb.execute.mockResolvedValueOnce([{ affected: 1 }])

    const result = await handler({})

    expect(result).toEqual({
      ok: true,
      verified: true,
    })
    expect(mockDb.update).toHaveBeenCalled()
    expect(mockDb.set).toHaveBeenCalledWith({
      backlinkVerified: true,
      backlinkVerifiedAt: expect.anything(),
    })
  })

  it('should not verify backlink when no valid link is found', async () => {
    mockGetQuery.mockReturnValue({
      id: '123',
      module: 'test-module',
    })

    // Record exists but not verified
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 123,
        entity: 1,
        slug: 'test-entity.com',
        backlinkVerified: false,
      },
    ])

    // Fetch succeeds
    globalThis.fetch.mockResolvedValueOnce({
      text: vi
        .fn()
        .mockResolvedValue(
          '<html><body><a href="https://different-domain.com">Wrong link</a></body></html>',
        ),
    })

    // Set up mock links to include a different domain
    mockLinks.push('https://different-domain.com')

    const result = await handler({})

    expect(result).toEqual({
      ok: true,
      verified: false,
    })
    // Update should not be called
    expect(mockDb.update).not.toHaveBeenCalled()
  })

  it('should handle development environment correctly', async () => {
    // Set environment to development
    process.env.NODE_ENV = 'development'

    mockGetQuery.mockReturnValue({
      id: '123',
      module: 'test-module',
    })

    // Record exists but not verified
    mockDb.execute.mockResolvedValueOnce([
      {
        id: 123,
        entity: 1,
        slug: 'test-entity.com',
        backlinkVerified: false,
      },
    ])

    // Fetch succeeds
    globalThis.fetch.mockResolvedValueOnce({
      text: vi
        .fn()
        .mockResolvedValue(
          '<html><body><a href="http://localhost:3000">Local link</a></body></html>',
        ),
    })

    // Set up mock links to include localhost
    mockLinks.push('http://localhost:3000')

    // Verify succeeds
    mockDb.execute.mockResolvedValueOnce([{ affected: 1 }])

    const result = await handler({})

    expect(result).toEqual({
      ok: true,
      verified: true,
    })
  })
})
