export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@serp/ui', '@serp/types', '@serp/utils'],
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@nuxtjs/html-validator',
    'nuxt-security',
    '@nuxt/scripts',
    'nuxt-link-checker',
    'nuxt-multi-cache',
    '@nuxthub/core'
  ],
  nitro: {
    experimental: {
      tasks: true
    }
  },
  multiCache: {
    data: {
      enabled: false
    }
  },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: true
  },
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE
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
      useAuth: false,
      forCloudflare: true,
      environment: process.env.NODE_ENV,
      copyrightText: '© The Movie Stop'
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
          id: 'GTM-TM5R8LCN'
        }
      }
    }
  },
  schemaOrg: {
    identity: 'Organization',
    host: 'https://moviestop.pages.dev'
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
  typescript: {
    typeCheck: true
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
    database: false
  }
});
