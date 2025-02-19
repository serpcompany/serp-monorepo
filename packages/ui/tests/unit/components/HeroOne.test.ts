import { renderSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/vue';
import HeroOne from '~/components/Section/HeroOne.vue';

describe('HeroOne', () => {
  it('should render an title', async () => {
    await renderSuspended(HeroOne, { props: { title: 'Some Title' } });
    const heading = screen.getByRole('heading', { name: 'Some Title' });
    expect(heading).toBeInTheDocument();
  });

  it('given a subtitle prop, should render a subtitle', async () => {
    await renderSuspended(HeroOne, {
      props: { title: 'Some Title', subtitle: 'Some Subtitle' }
    });
    const subtitle = screen.getByText('Some Subtitle');
    expect(subtitle).toBeInTheDocument();
  });

  it('if we dont provide a subtitle, the subtitle area should not render', async () => {
    await renderSuspended(HeroOne, { props: { title: 'Some Title' } });
    const subtitle = screen.queryByTestId('subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });
});
