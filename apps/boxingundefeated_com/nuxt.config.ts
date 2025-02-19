export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/html-validator',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    'nuxt-multi-cache',
    'nuxt-security',
    '@nuxt/scripts',
    'nuxt-link-checker'
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: true
  },
  tsConfig: {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['src/*']
      },
      types: ['vitest/globals', '']
    }
  },
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      siteUrl: process.env.NUXT_PUBLIC_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      environment: process.env.NODE_ENV,
      socialLinks: [
        {
          name: 'Twitter',
          href: 'https://serp.ly/@serp/twitter',
          icon: 'i-lucide-twitter'
        },
        {
          name: 'Facebook',
          href: 'https://serp.ly/@serp/facebook',
          icon: 'i-lucide-facebook'
        },
        {
          name: 'LinkedIn',
          href: 'https://serp.ly/@serp/linkedin',
          icon: 'i-lucide-linkedin'
        },
        {
          name: 'YouTube',
          href: 'https://serp.ly/@serp/youtube',
          icon: 'i-lucide-youtube'
        },
        {
          name: 'Github',
          href: 'https://serp.ly/@serpai/github',
          icon: 'i-lucide-github'
        },
        {
          name: 'Instagram',
          href: 'https://serp.ly/@serp/instagram',
          icon: 'i-lucide-instagram'
        },
        {
          name: 'SoundCloud',
          href: 'https://serp.ly/@serp/',
          icon: 'i-lucide-external-link'
        }
      ],
      brandLinks: [
        {
          name: 'About',
          href: 'https://github.com/serpcompany'
        },
        {
          name: 'Add Your Product',
          href: 'https://serp.ly/@serp/submit'
        }
      ],
      headerNavItems: [
        {
          label: 'Boxers',
          children: [{ label: 'Boxers', to: '/boxers/' }]
        },
        {
          label: 'Weight Classes',
          children: [{ label: 'Weight Classes', to: '/weight-classes/' }]
        }
      ],
      footerColumns: [
        {
          title: 'Links',
          id: 1,
          slug: '',
          items: [
            { text: 'Boxers', slug: '/boxers/' },
            { text: 'Weight Classes', slug: '/weight-classes/' }
          ]
        }
      ],
      legalLinks: [
        { text: 'Privacy', slug: '/legal/privacy-policy/' },
        { text: 'Terms', slug: '/legal/terms-conditions/' },
        { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
        { text: 'DMCA', slug: '/legal/dmca/' }
      ],
      copyrightText: '© SERP',
      address: '123 Rank St. Page One City, 90210 USA'
    }
  },
  app: {
    head: {
      title: process.env.NUXT_PUBLIC_SITE_NAME,
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        ...(process.env.ROBOTS_ENV === 'staging'
          ? [{ name: 'robots', content: 'noindex' }]
          : [])
      ]
    }
  },
  $production: {
    scripts: {
      registry: {
        googleTagManager: {
          id: ''
        }
      }
    }
  },
  schemaOrg: {
    identity: 'Organization',
    host: 'https://boxingundefeated.com'
  },
  experimental: {
    defaults: {
      nuxthref: {
        trailingSlash: 'append'
      }
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_URL,
    name: process.env.NUXT_PUBLIC_SITE_NAME,
    trailingSlash: true
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons'
      }
    ]
  },
  image: {
    // domains: ['archive.org', 'loremflickr.com'],
    format: ['webp']
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https://*']
      }
    }
  },
  htmlValidator: {
    usePrettier: false,
    failOnError: true,
    logLevel: 'verbose'
  },
  linkChecker: {
    failOnError: true,
    report: {
      html: true
    }
  },
  ogImage: {
    enabled: false
  },
  multiCache: {
    data: {
      enabled: true
    }
  },
  sitemap: {
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: 'weekly'
    },
    sitemaps: {
      modules: {
        includeAppSources: true
      },
      boxers: {
        sources: ['/api/__sitemap__/boxers']
      },
      ['weight-classes']: {
        sources: ['/api/__sitemap__/weight-classes']
      },
    }
  }
});
