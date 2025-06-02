import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SFooter from '../../components/SFooter.vue'
import ComponentRender from '../componentRender'

// Initialize a default runtime config object
let config_: Record<string, unknown> = {
  app: { baseURL: '/' },
  public: {
    siteName: 'Default Company',
    socialLinks: [],
    brandLinks: [],
    copyrightText: '',
    footerColumns: [],
    legalLinks: [],
  },
}

describe('sFooter Snapshot', () => {
  // Define test scenarios with varying runtime configurations
  const scenarios: [string, { config: Record<string, unknown> }][] = [
    [
      'full config',
      {
        config: {
          app: { baseURL: '/' },
          public: {
            siteName: 'My Company',
            socialLinks: [
              {
                name: 'Twitter',
                href: 'https://twitter.com',
                icon: 'twitter-icon',
              },
              {
                name: 'Facebook',
                href: 'https://facebook.com',
                icon: 'facebook-icon',
              },
            ],
            brandLinks: [
              { name: 'Blog', href: '/blog' },
              { name: 'Careers', href: '/careers' },
            ],
            copyrightText: '© 2023 My Company',
            address: '1234 Nuxt Street, Vue City',
            footerColumns: [
              {
                id: 1,
                title: 'Products',
                items: [
                  { slug: '/product-1', text: 'Product 1' },
                  { slug: '/product-2', text: 'Product 2' },
                ],
              },
              {
                id: 2,
                title: 'Support',
                items: [{ slug: '/support', text: 'Help Center' }],
              },
            ],
            legalLinks: [
              { text: 'Privacy Policy', slug: '/privacy' },
              { text: 'Terms of Service', slug: '/terms' },
            ],
          },
        },
      },
    ],
    [
      'minimal config with empty arrays',
      {
        config: {
          app: { baseURL: '/' },
          public: {
            siteName: 'Minimal Inc.',
            socialLinks: [],
            brandLinks: [],
            copyrightText: '',
            footerColumns: [],
            legalLinks: [],
          },
        },
      },
    ],
  ]

  it.each(scenarios)(
    'renders %s correctly',
    async (desc: string, { config }) => {
      // Update mock runtime config for this scenario
      config_ = config
      mockNuxtImport('useRuntimeConfig', () => () => config_)

      const html = await ComponentRender(`SFooter ${desc}`, {}, SFooter)
      expect(html).toMatchSnapshot()
    },
  )
})
