/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SPageArtistCollection from '../../../../components/SPage/Artist/Collection.vue';
import ComponentRender from '../../../componentRender';

mockNuxtImport('useRuntimeConfig', () => () => ({
  public: {
    apiUrl: 'http://mock-api.test'
  }
}));

mockNuxtImport('useSeoMeta', () => () => {});

mockNuxtImport('useFetch', () => async (url: string, options: unknown) => {
  return {
    data: {
      artists: [
        { id: 1, name: 'Artist 1', slug: 'artist-1' },
        { id: 2, name: 'Artist 2', slug: 'artist-2' }
      ],
      pagination: { totalItems: 2 }
    }
  };
});

describe('SPageArtistCollection Snapshot', () => {
  const scenarios: [string][] = [['with defaults']];

  it.each(scenarios)('renders %s correctly', async (desc: string) => {
    const html = await ComponentRender(
      `SPageArtistCollection ${desc}`,
      {},
      SPageArtistCollection
    );
    expect(html).toMatchSnapshot();
  });
});
