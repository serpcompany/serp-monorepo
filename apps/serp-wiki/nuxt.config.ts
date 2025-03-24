export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@serp/ui', '@serp/types', '@serp/utils-cloudflare-pages'],
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxtjs/html-validator',
    'nuxt-security',
    '@nuxt/scripts',
    'nuxt-link-checker',
    '@nuxthub/core'
  ],
  nitro: {
    experimental: {
      tasks: true
    }
  },
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
      apiUrl: '/api',
      useAuth: true,
      environment: process.env.NODE_ENV,
      socialLinks: [
        {
          name: 'Twitter',
          href: 'https://serp.ly/@serpwiki/twitter',
          icon: 'i-lucide-twitter'
        },
        {
          name: 'Facebook',
          href: 'https://serp.ly/@serpwiki/facebook',
          icon: 'i-lucide-facebook'
        },
        {
          name: 'LinkedIn',
          href: 'https://serp.ly/@serpwiki/linkedin',
          icon: 'i-lucide-linkedin'
        },
        {
          name: 'YouTube',
          href: 'https://serp.ly/@serpwiki/youtube',
          icon: 'i-lucide-youtube'
        },
        {
          name: 'Github',
          href: 'https://serp.ly/@serpwiki/github',
          icon: 'i-lucide-github'
        },
        {
          name: 'Instagram',
          href: 'https://serp.ly/@serpwiki/instagram',
          icon: 'i-lucide-instagram'
        },
        {
          name: 'SoundCloud',
          href: 'https://serp.ly/@serpwiki/soundcloud',
          icon: 'i-lucide-external-link'
        }
      ],
      brandLinks: [
        {
          name: 'About',
          href: 'https://github.com/serpcompany'
        }
      ],
      headerNavItems: [
        {
          label: 'Posts',
          children: [{ label: 'Posts', to: '/posts/' }]
        }
      ],
      footerColumns: [
        {
          title: 'Links',
          id: 1,
          slug: '',
          items: [{ text: 'Posts', slug: '/posts/' }]
        }
      ],
      legalLinks: [
        { text: 'Privacy', slug: '/legal/privacy-policy/' },
        { text: 'Terms', slug: '/legal/terms-conditions/' },
        { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
        { text: 'DMCA', slug: '/legal/dmca/' }
      ],
      copyrightText: '© SERP',
      address: ''
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
          id: 'GTM-PDJLSTWM'
        }
      }
    }
  },
  schemaOrg: {
    identity: 'Organization',
    host: 'https://serp.wiki'
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
    format: ['webp']
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https://*']
      }
    },
    rateLimiter: false
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
  hub: {
    database: true,
    databaseMigrationsDirs: ['server/db/migrations', 'server/api/db/migrations']
  }
});
