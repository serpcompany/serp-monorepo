import { renderSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';

import FirstCharacterJumpLinkNav from '@/components/FirstCharacterJumpLinkNav.vue';

describe('FirstCharacterJumpLinkNav', () => {
  it('should render every letter in characters array', async () => {
    await renderSuspended(FirstCharacterJumpLinkNav, {
      props: { characters: ['a', '*'], filteredCharacters: [] }
    });

    const chars = screen.getAllByRole('link');

    expect(chars.length).toEqual(2);
    expect(chars[0].textContent).toEqual('a');
    expect(chars[1].textContent).toEqual('*');
  });

  // it("should add jump links for a char in filteredChars", async () => { });

  // it("should not add jump links for chars not in filteredChars", async () => { });
});
