import { beforeEach, describe, expect, it } from 'vitest'
import productRedirectsMiddleware from '../../../middleware/productRedirects.global'
import { mockNavigateTo } from '../../setup'

describe('product Redirects Middleware', () => {
  beforeEach(() => {
    mockNavigateTo.mockClear()
  })

  it('should redirect product paths to their reviews', () => {
    const to = { path: '/products/example-product', query: {}, hash: '' }
    const from = {}

    productRedirectsMiddleware(to, from)

    expect(mockNavigateTo).toHaveBeenCalledWith(
      { path: '/products/example-product/reviews/', query: {}, hash: '' },
      { redirectCode: 301 },
    )
  })

  it('should redirect product paths with trailing slash to their reviews', () => {
    const to = { path: '/products/example-product/', query: {}, hash: '' }
    const from = {}

    productRedirectsMiddleware(to, from)

    expect(mockNavigateTo).toHaveBeenCalledWith(
      { path: '/products/example-product/reviews/', query: {}, hash: '' },
      { redirectCode: 301 },
    )
  })

  it('should preserve query parameters and hash when redirecting', () => {
    const to = {
      path: '/products/example-product',
      query: { utm_source: 'homepage' },
      hash: '#specs',
    }
    const from = {}

    productRedirectsMiddleware(to, from)

    expect(mockNavigateTo).toHaveBeenCalledWith(
      {
        path: '/products/example-product/reviews/',
        query: { utm_source: 'homepage' },
        hash: '#specs',
      },
      { redirectCode: 301 },
    )
  })

  it('should not redirect if path does not match product pattern', () => {
    const to = { path: '/about', query: {}, hash: '' }
    const from = {}

    productRedirectsMiddleware(to, from)

    expect(mockNavigateTo).not.toHaveBeenCalled()
  })

  it('should not redirect if product path already has a subpath', () => {
    const to = { path: '/products/example-product/specs', query: {}, hash: '' }
    const from = {}

    productRedirectsMiddleware(to, from)

    expect(mockNavigateTo).not.toHaveBeenCalled()
  })
})
