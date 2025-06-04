import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SPageToolCombineCsvFiles from '../../../../components/SPage/Tool/CombineCsvFiles.vue'
import ComponentRender from '../../../componentRender'

mockNuxtImport('useSeoMeta', () => () => {})

describe('sPageToolCombineCsvFiles Snapshot', () => {
  it('renders the default snapshot correctly', async () => {
    const html = await ComponentRender(
      'SPageToolCombineCsvFiles',
      {},
      SPageToolCombineCsvFiles,
    )
    expect(html).toMatchSnapshot()
  })
})
