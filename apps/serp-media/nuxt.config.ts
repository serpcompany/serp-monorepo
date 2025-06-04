export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@serp/utils', '@serp/tools', '@serp/types', '@serp/ui'],
  modules: [
    '@nuxt/ui-pro',
    '@nuxtjs/html-validator',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    'nuxt-multi-cache',
    'nuxt-security',
    '@nuxt/scripts',
    'nuxt-link-checker',
  ],
  css: ['~/assets/css/main.css'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  ui: {
    colorMode: true,
  },
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE,
  },
  sitemap: {
    enabled: false,
  },
  robots: {
    enabled: false,
  },
  tsConfig: {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['src/*'],
      },
      types: ['vitest/globals', ''],
    },
  },
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      siteUrl: process.env.NUXT_PUBLIC_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      forCloudflare: false,
      environment: process.env.NODE_ENV,
      copyrightText: '© SERP',
    },
  },
  app: {
    head: {
      title: process.env.NUXT_PUBLIC_SITE_NAME,
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        ...(process.env.ROBOTS_ENV === 'staging'
          ? [{ name: 'robots', content: 'noindex' }]
          : []),
      ],
    },
  },
  scripts: {
    registry: {
      googleTagManager: {
        id: 'GTM-TXRPD22Q',
      },
    },
  },
  schemaOrg: {
    identity: 'Organization',
    host: 'https://serp.media',
  },
  experimental: {
    defaults: {
      nuxthref: {
        trailingSlash: 'append',
      },
    },
  },
  site: {
    url: process.env.NUXT_PUBLIC_URL,
    name: process.env.NUXT_PUBLIC_SITE_NAME,
    trailingSlash: true,
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons',
      },
    ],
  },
  image: {
    format: ['webp'],
  },
  security: {
    rateLimiter: false,
    headers: {
      contentSecurityPolicy: {
        'img-src': ['\'self\'', 'data:', '*'],
        'script-src-attr': ['\'unsafe-inline\''],
      },
    },
  },
  htmlValidator: {
    usePrettier: false,
    failOnError: true,
    logLevel: 'verbose',
  },
  linkChecker: {
    failOnError: true,
    report: {
      html: true,
    },
  },
  ogImage: {
    enabled: false,
  },
  multiCache: {
    data: {
      enabled: true,
    },
    api: {
      enabled: true,
      prefix: '/__nuxt_multi_cache',
      authorization: process.env.CACHE_PURGE_API_KEY || 'xv12378asdfSDA123',
    },
  },
})
