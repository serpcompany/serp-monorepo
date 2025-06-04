import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { vi } from 'vitest'
import { ref } from 'vue'

mockNuxtImport('useUserSession', () => () => ({
  loggedIn: ref(true),
  user: ref({ name: 'Test User', email: 'test@test.com' }),
  clear: vi.fn(),
}))
