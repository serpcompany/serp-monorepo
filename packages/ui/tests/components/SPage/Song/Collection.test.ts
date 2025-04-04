/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SPageSongCollection from '../../../../components/SPage/Song/Collection.vue';
import ComponentRender from '../../../componentRender';

mockNuxtImport('useSeoMeta', () => () => {});

mockNuxtImport('useFetch', () => async (url: string, options: unknown) => {
  return {
    data: {
      songs: [
        {
          id: 1,
          name: 'Song 1',
          slug: 'song-1',
          artists: [
            { slug: 'artist-1', credit_name: 'Artist One', join_phrase: '' }
          ]
        },
        {
          id: 2,
          name: 'Song 2',
          slug: 'song-2',
          artists: [
            { slug: 'artist-2', credit_name: 'Artist Two', join_phrase: '' }
          ]
        }
      ],
      pagination: { totalItems: 2 }
    }
  };
});

describe('SPageSongCollection Snapshot', () => {
  const scenarios: [string][] = [['with defaults']];

  it.each(scenarios)('renders %s correctly', async (desc: string) => {
    const html = await ComponentRender(
      `SPageSongCollection ${desc}`,
      {},
      SPageSongCollection
    );
    expect(html).toMatchSnapshot();
  });
});
