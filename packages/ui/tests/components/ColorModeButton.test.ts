import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ColorModeButton from '../../components/ColorModeButton.vue'
import ComponentRender from '../componentRender'

let colorMode_: string = 'dark'

describe('colorModeButton Snapshot', () => {
  // Testing both light and dark mode scenarios.
  const scenarios: [string, 'light' | 'dark'][] = [
    ['light mode', 'light'],
    ['dark mode', 'dark'],
  ]

  it.each(scenarios)('renders correctly in %s', async (desc, colorMode) => {
    colorMode_ = colorMode
    mockNuxtImport('useColorMode', () => () => colorMode_)

    // Render the component and generate a snapshot
    const html = await ComponentRender(
      `ColorModeButton ${desc}`,
      {},
      ColorModeButton,
    )
    expect(html).toMatchSnapshot()
  })
})
