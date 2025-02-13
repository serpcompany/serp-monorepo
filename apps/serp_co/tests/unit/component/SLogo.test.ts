import { renderSuspended } from '@nuxt/test-utils/runtime';
import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';

import SLogo from '@/components/SLogo.vue';

describe('SLogo', () => {
  it('should render the SVG logo with the correct accessible name', async () => {
    await renderSuspended(SLogo);

    const logo = screen.getByLabelText(/Brand logo/i);
    expect(logo).toBeInTheDocument();
  });
});
