/* eslint-disable ts/no-unused-vars */

import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import SScriptYouTubePlayer from '../../components/SScriptYouTubePlayer.vue'
import ComponentRender from '../componentRender'

// Mock YT object (this is a global browser object)
globalThis.YT = {
  Player: class {
    playVideo() {}
    loadVideoById(id: string) {}
  },
  ready: (callback: () => void) => callback(),
}

// Also define YouTube for the component's code
globalThis.YouTube = {
  ready: (callback: () => void) => callback(),
}

mockNuxtImport('useHead', () => () => {})
mockNuxtImport('useScriptTriggerElement', () => () => ({ ssrAttrs: {} }))

let youtubePlayerStatus = 'awaitingLoad'

describe('sScriptYouTubePlayer', () => {
  const baseProps = { videoId: 'dQw4w9WgXcQ', width: 640, height: 360 }

  it.each([
    // Default state: no slot overrides, status will be 'awaitingLoad'
    ['default (awaitingLoad)', { props: { ...baseProps } }],
    // Custom placeholder slot (still 'awaitingLoad')
    [
      'with custom placeholder slot',
      {
        props: { ...baseProps },
        slots: { placeholder: () => '<img alt="Custom Placeholder" />' },
      },
    ],
    // Loading state: simulate status 'loading'
    [
      'with loading slot',
      {
        props: { ...baseProps },
        slots: { loading: () => '<div>Loading...</div>' },
      },
    ],
    // Awaiting load state: simulate status 'awaitingLoad' with a custom slot
    [
      'with awaitingLoad slot',
      {
        props: { ...baseProps },
        slots: { awaitingLoad: () => '<div>Awaiting load</div>' },
      },
    ],
    // Error state: simulate status 'error'
    [
      'with error slot',
      {
        props: { ...baseProps },
        slots: { error: () => '<div>Error occurred</div>' },
      },
    ],
  ])(
    'renders %s correctly',
    async (desc: string, options: { props: unknown, slots?: unknown }) => {
      // Determine status based on the provided slots
      let status = 'awaitingLoad'
      if (options.slots?.loading)
        status = 'loading'
      if (options.slots?.error)
        status = 'error'

      youtubePlayerStatus = status

      mockNuxtImport('useScriptYouTubePlayer', () => () => ({
        // eslint-disable-next-line ts/no-unsafe-function-type
        onLoaded: (cb: Function) => {
          if (youtubePlayerStatus !== 'awaitingLoad') {
            // eslint-disable-next-line ts/no-extraneous-class
            cb({ YT: { Player: class {} } })
          }
        },
        status: ref(youtubePlayerStatus),
        load: () => {}, // Add the missing load function
      }))

      const html = await ComponentRender(
        `SScriptYouTubePlayer ${desc}`,
        options,
        SScriptYouTubePlayer,
      )
      expect(html).toMatchSnapshot()
    },
  )
})
