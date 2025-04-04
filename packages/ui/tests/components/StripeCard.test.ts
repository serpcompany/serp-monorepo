import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import StripeCard from '../../components/StripeCard.vue';
import ComponentRender from '../componentRender';

(globalThis as unknown).useClientStripe = async () => ({
  stripe: {
    elements: (options: unknown) => ({
      create: (type: string) => ({
        mount: () => {}
      })
    }),
    confirmPayment: async () => ({ error: null })
  }
});

mockNuxtImport('useColorMode', () => () => ref('light'));

describe('StripeCard Snapshot', () => {
  const scenarios: [
    string,
    { props: Record<string, unknown>; slots?: Record<string, unknown> }
  ][] = [
    ['with default props', { props: {} }],
    [
      'with valid payment props',
      {
        props: {
          type: 'subscription',
          id: '123',
          secondaryId: '456',
          redirectTo: '/dashboard'
        }
      }
    ],
    [
      'with custom content slot',
      {
        props: {},
        slots: { content: () => '<div>Custom Payment Intent Trigger</div>' }
      }
    ]
  ];

  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, options: { props: unknown; slots?: unknown }) => {
      const html = await ComponentRender(
        `StripeCard ${desc}`,
        options,
        StripeCard
      );
      expect(html).toMatchSnapshot();
    }
  );
});
