import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SPageToolConvertJsonToCsv from '../../../../components/SPage/Tool/ConvertJsonToCsv.vue'
import ComponentRender from '../../../componentRender'

mockNuxtImport('useSeoMeta', () => () => {})

describe('sPageToolConvertJsonToCsv Snapshot', () => {
  it('renders the default snapshot correctly', async () => {
    const html = await ComponentRender(
      'SPageToolConvertJsonToCsv',
      {},
      SPageToolConvertJsonToCsv,
    )
    expect(html).toMatchSnapshot()
  })
})
