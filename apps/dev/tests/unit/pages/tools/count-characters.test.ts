import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import countCharacters from '~/pages/tools/count-characters.vue'

describe('count-characters.vue', () => {
  it('renders', async () => {
    await renderSuspended(countCharacters)

    const text = screen.getAllByText(/character counter/i)
    expect(text[0]).toBeInTheDocument()
  })
})
