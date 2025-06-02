import { describe, expect, it } from 'vitest'
import SPill from '../../components/SPill.vue'
import ComponentRender from '../componentRender'

describe('sPill', () => {
  const baseSlug = 'category'

  it.each([
    ['with no items', { props: { items: [], baseSlug } }],
    [
      'with one item',
      {
        props: { items: [{ id: 1, slug: 'item-1', name: 'Item 1' }], baseSlug },
      },
    ],
    [
      'with multiple items',
      {
        props: {
          items: [
            { id: 1, slug: 'item-1', name: 'Item 1' },
            { id: 2, slug: 'item-2', name: 'Item 2' },
            { id: 3, slug: 'item-3', name: 'Item 3' },
          ],
          baseSlug,
        },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(`SPill ${desc}`, options, SPill)
      expect(html).toMatchSnapshot()
    },
  )
})
