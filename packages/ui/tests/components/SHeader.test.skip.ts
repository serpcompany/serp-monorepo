import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import SHeader from '../../components/SHeader.vue';
import ComponentRender from '../componentRender';
import '../mockUseUserSession';

// We're testing different runtime config setups to ensure SHeader renders correctly under various conditions.
let config_: Record<string, unknown> = {
  public: {
    headerNavItems: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
    ],
    useAuth: true,
  },
};

describe('SHeader Snapshot', () => {
  // Test scenarios with different runtime config values.
  const scenarios: [string, { config: Record<string, unknown> }][] = [
    [
      'with auth enabled',
      {
        config: {
          public: {
            headerNavItems: [
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
            ],
            useAuth: true,
          },
        },
      },
    ],
    [
      'with auth disabled',
      {
        config: {
          public: {
            headerNavItems: [
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
            ],
            useAuth: false,
          },
        },
      },
    ],
    [
      'with empty navigation items',
      {
        config: {
          public: {
            headerNavItems: [],
            useAuth: true,
          },
        },
      },
    ],
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, { config }) => {
      // Set up the runtime config for this test scenario
      config_ = config;
      mockNuxtImport('useRuntimeConfig', () => () => config_);

      const html = await ComponentRender(`SHeader ${desc}`, {}, SHeader);
      expect(html).toMatchSnapshot();
    },
  );
});
