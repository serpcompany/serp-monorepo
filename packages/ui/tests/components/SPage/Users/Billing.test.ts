import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import Billing from '../../../../components/SPage/Users/Billing.vue'
import ComponentRender from '../../../componentRender'

// Declare a mutable session_ variable.
let session_: { loggedIn: unknown, user: unknown, clear: unknown }

mockNuxtImport('useUserSession', () => () => session_)
mockNuxtImport('useSeoMeta', () => () => {})

describe('sPage/Users/Billing Snapshot', () => {
  const scenarios: [
    string,
    { session: { loggedIn: unknown, user: unknown, clear: unknown } },
  ][] = [
    [
      'when user is logged in',
      {
        session: {
          loggedIn: ref(true),
          user: ref({
            name: 'Test User',
            email: 'test@test.com',
            image: 'https://example.com/test.jpg',
          }),
          clear: vi.fn(),
        },
      },
    ],
    [
      'when user is not logged in',
      {
        session: {
          loggedIn: ref(false),
          user: ref(null),
          clear: vi.fn(),
        },
      },
    ],
  ]

  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, { session }) => {
      // Update the session for this scenario.
      session_ = session

      const html = await ComponentRender(
        `SPage/Users/Billing ${desc}`,
        {},
        Billing,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
