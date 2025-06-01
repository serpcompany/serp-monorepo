import { describe, expect, it } from 'vitest'
import HeroOne from '../../../components/Section/HeroOne.vue'
import ComponentRender from '../../componentRender'

describe('sectionHeroOne Snapshot', () => {
  it.each([
    ['with title only', { props: { title: 'Welcome to HeroOne' } }],
    [
      'with title and subtitle',
      { props: { title: 'Welcome to HeroOne', subtitle: 'This is a subtitle' } },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(`HeroOne ${desc}`, options, HeroOne)
      expect(html).toMatchSnapshot()
    },
  )
})
