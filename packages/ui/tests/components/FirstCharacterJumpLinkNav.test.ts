import { describe, expect, it } from 'vitest'
import FirstCharacterJumpLinkNav from '../../components/FirstCharacterJumpLinkNav.vue'
import ComponentRender from '../componentRender'

describe('firstCharacterJumpLinkNav Snapshot', () => {
  it.each([
    [
      'with no characters',
      { props: { characters: [], filteredCharacters: [] } },
    ],
    [
      'with all buttons enabled',
      {
        props: {
          characters: ['A', 'B', 'C'],
          filteredCharacters: ['A', 'B', 'C'],
        },
      },
    ],
    [
      'with some buttons disabled',
      {
        props: {
          characters: ['A', 'B', 'C'],
          filteredCharacters: ['A', 'C'],
        },
      },
    ],
    [
      'with all buttons disabled',
      {
        props: {
          characters: ['A', 'B', 'C'],
          filteredCharacters: [],
        },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown }) => {
      const html = await ComponentRender(
        `FirstCharacterJumpLinkNav ${desc}`,
        options,
        FirstCharacterJumpLinkNav,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
