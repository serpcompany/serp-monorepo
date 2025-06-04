import { vi } from 'vitest'

// Mock navigateTo function
export const mockNavigateTo = vi.fn()
vi.stubGlobal('navigateTo', mockNavigateTo)

// Mock defineNuxtRouteMiddleware function
export const mockDefineNuxtRouteMiddleware = vi.fn(handler => handler)
vi.stubGlobal('defineNuxtRouteMiddleware', mockDefineNuxtRouteMiddleware)

// Mock useAppConfig function
export const mockUseAppConfig = vi.fn(() => ({
  redirects: {
    '/old-path': '/new-path',
    '/blog': '/posts',
    '/about-us': '/about',
  },
}))
vi.stubGlobal('useAppConfig', mockUseAppConfig)
