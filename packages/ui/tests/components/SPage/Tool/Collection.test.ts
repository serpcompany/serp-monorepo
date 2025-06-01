import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SPageToolCollection from '../../../../components/SPage/Tool/Collection.vue'
import ComponentRender from '../../../componentRender'

mockNuxtImport('useSeoMeta', () => () => {})

describe('sPageToolCollection Snapshot', () => {
  it('renders the default snapshot correctly', async () => {
    const html = await ComponentRender(
      'SPageToolCollection',
      {},
      SPageToolCollection,
    )
    expect(html).toMatchSnapshot()
  })
})
