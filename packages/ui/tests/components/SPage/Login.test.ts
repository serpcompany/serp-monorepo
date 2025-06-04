import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import Login from '../../../components/SPage/Login.vue'
import ComponentRender from '../../componentRender'

const userSessionMock = {
  loggedIn: ref(false),
} as unknown

mockNuxtImport('useUserSession', () => () => userSessionMock)

// Global route query variable – we'll update this per test case
let routeQuery: Record<string, unknown> = {}

// Mock useRoute to return our dynamic query object
mockNuxtImport('useRoute', () => () => ({ query: routeQuery }))

describe('login Snapshot', () => {
  const scenarios: [
    string,
    { query: Record<string, unknown>, loggedIn: boolean },
  ][] = [
    [
      'renders login page when not logged in without redirect query',
      { query: {}, loggedIn: false },
    ],
    [
      'renders login page when not logged in with redirect query',
      { query: { redirectTo: '/dashboard' }, loggedIn: false },
    ],
    [
      'redirects when already logged in without redirect query',
      { query: {}, loggedIn: true },
    ],
    [
      'redirects when already logged in with redirect query',
      { query: { redirectTo: '/dashboard' }, loggedIn: true },
    ],
  ]

  it.each(scenarios)('%s', async (desc, { query, loggedIn }) => {
    // Update state for this scenario.
    routeQuery = query
    userSessionMock.loggedIn.value = loggedIn

    // Refresh our useRoute mock with the updated query.
    mockNuxtImport('useRoute', () => () => ({ query: routeQuery }))

    // Override navigateTo to avoid actual redirection and capture calls.
    mockNuxtImport('navigateTo', () => vi.fn())

    const html = await ComponentRender(`Login ${desc}`, {}, Login)
    expect(html).toMatchSnapshot()
  })
})
