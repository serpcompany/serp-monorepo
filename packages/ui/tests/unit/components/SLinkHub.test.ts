import { renderSuspended } from '@nuxt/test-utils/runtime';
import { describe, it } from 'vitest';
import SLinkHub from '~/components/SLinkHub.vue';

const mockCategories = [
  {
    id: 1,
    name: 'Email Marketing',
    slug: 'email-marketing'
  },
  {
    id: 2,
    name: 'Jello Fighting',
    slug: 'jello-fighting'
  },
  // Blank or invalid items
  {
    id: undefined,
    slug: '',
    name: ''
  },
  {
    id: 2,
    slug: null as unknown as string,
    name: 'Invalid Category'
  },
  {
    id: 'banana',
    slug: 'category-5',
    name: ''
  }
];

describe('SLinkHub', () => {
  it('displays the link hub headline', async () => {
    await renderSuspended(SLinkHub, {
      props: {
        headline: 'Categories',
        categories: mockCategories
      }
    });
  });

  it('should render a link for each provided category', () => {});

  it('should not display blank items', () => {});
});
