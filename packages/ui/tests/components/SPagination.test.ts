import { describe, expect, it } from 'vitest'
import SPagination from '../../components/SPagination.vue'
import ComponentRender from '../componentRender'

describe('sPagination', () => {
  it.each([
    // When no props are provided, the withDefaults in the component should kick in.
    ['with default props', { props: {} }],
    // Custom pagination settings.
    [
      'with custom pagination values',
      { props: { totalItems: 100, limit: 10, siblingCount: 2 } },
    ],
  ])('renders %s correctly', async (desc, options: { props: unknown }) => {
    const html = await ComponentRender(
      `SPagination ${desc}`,
      options,
      SPagination,
    )
    expect(html).toMatchSnapshot()
  })
})
