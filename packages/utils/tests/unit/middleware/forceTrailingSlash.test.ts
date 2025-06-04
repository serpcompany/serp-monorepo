import { beforeEach, describe, expect, it } from 'vitest'
import forceTrailingSlashMiddleware from '../../../middleware/forceTrailingSlash.global'
import { mockNavigateTo } from '../../setup'

describe('force Trailing Slash Middleware', () => {
  beforeEach(() => {
    mockNavigateTo.mockClear()
  })

  it('should add trailing slash to paths without one', () => {
    const to = { path: '/about', query: {}, hash: '' }
    const from = {}

    forceTrailingSlashMiddleware(to, from)

    expect(mockNavigateTo).toHaveBeenCalledWith(
      { path: '/about/', query: {}, hash: '' },
      { redirectCode: 301 },
    )
  })

  it('should preserve query parameters and hash when redirecting', () => {
    const to = {
      path: '/contact',
      query: { ref: 'homepage', utm_source: 'email' },
      hash: '#contact-form',
    }
    const from = {}

    forceTrailingSlashMiddleware(to, from)

    expect(mockNavigateTo).toHaveBeenCalledWith(
      {
        path: '/contact/',
        query: { ref: 'homepage', utm_source: 'email' },
        hash: '#contact-form',
      },
      { redirectCode: 301 },
    )
  })

  it('should not redirect if path already has trailing slash', () => {
    const to = { path: '/about/', query: {}, hash: '' }
    const from = {}

    forceTrailingSlashMiddleware(to, from)

    expect(mockNavigateTo).not.toHaveBeenCalled()
  })

  it('should not redirect the root path', () => {
    const to = { path: '/', query: {}, hash: '' }
    const from = {}

    forceTrailingSlashMiddleware(to, from)

    expect(mockNavigateTo).not.toHaveBeenCalled()
  })

  it('should not redirect paths ending with .xml', () => {
    const to = { path: '/sitemap.xml', query: {}, hash: '' }
    const from = {}

    forceTrailingSlashMiddleware(to, from)

    expect(mockNavigateTo).not.toHaveBeenCalled()
  })

  it('should not redirect paths ending with .txt', () => {
    const to = { path: '/robots.txt', query: {}, hash: '' }
    const from = {}

    forceTrailingSlashMiddleware(to, from)

    expect(mockNavigateTo).not.toHaveBeenCalled()
  })
})
