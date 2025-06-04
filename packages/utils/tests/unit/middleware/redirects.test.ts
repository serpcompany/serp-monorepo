import { beforeEach, describe, expect, it } from 'vitest'
import redirectsMiddleware from '../../../middleware/redirects.global'
import { mockNavigateTo } from '../../setup'

describe('redirects Middleware', () => {
  beforeEach(() => {
    mockNavigateTo.mockClear()
  })

  it('should redirect paths defined in redirects.json', () => {
    const to = { path: '/old-path', query: {}, hash: '' }
    const from = {}

    redirectsMiddleware(to, from)

    expect(mockNavigateTo).toHaveBeenCalledWith(
      { path: '/new-path', query: {}, hash: '' },
      { redirectCode: 301 },
    )
  })

  it('should redirect even with trailing slash in URL', () => {
    const to = { path: '/blog/', query: {}, hash: '' }
    const from = {}

    redirectsMiddleware(to, from)

    expect(mockNavigateTo).toHaveBeenCalledWith(
      { path: '/posts', query: {}, hash: '' },
      { redirectCode: 301 },
    )
  })

  it('should preserve query parameters and hash when redirecting', () => {
    const to = {
      path: '/about-us',
      query: { utm_source: 'social' },
      hash: '#team-section',
    }
    const from = {}

    redirectsMiddleware(to, from)

    expect(mockNavigateTo).toHaveBeenCalledWith(
      {
        path: '/about',
        query: { utm_source: 'social' },
        hash: '#team-section',
      },
      { redirectCode: 301 },
    )
  })

  it('should not redirect paths not defined in redirects.json', () => {
    const to = { path: '/contact', query: {}, hash: '' }
    const from = {}

    redirectsMiddleware(to, from)

    expect(mockNavigateTo).not.toHaveBeenCalled()
  })
})
