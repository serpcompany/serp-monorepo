import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SPageToolCountCharacters from '../../../../components/SPage/Tool/CountCharacters.vue'
import ComponentRender from '../../../componentRender'

mockNuxtImport('useSeoMeta', () => () => {})

describe('sPageToolCountCharacters Snapshot', () => {
  it('renders the default snapshot correctly', async () => {
    const html = await ComponentRender(
      'SPageToolCountCharacters',
      {},
      SPageToolCountCharacters,
    )
    expect(html).toMatchSnapshot()
  })
})
