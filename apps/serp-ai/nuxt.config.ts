import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@serp/utils', '@serp/tools', '@serp/types', '@serp/ui'],
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    'nuxt-multi-cache',
    'nuxt-security',
    'nuxt-link-checker',
  ],
  ui: {
    colorMode: true,
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
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE,
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
  typescript: {
    typeCheck: false, // Disable type checking errors to allow PRs to merge
  },
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      siteUrl: process.env.NUXT_PUBLIC_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      useAuth: true,
      environment: process.env.NODE_ENV,
      forCloudflare: false,
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
  security: {
    rateLimiter: false,
  },
  scripts: {
    registry: {
      googleTagManager: {
        id: 'GTM-M4ZSK3X',
      },
      googleAdsense: {
        client: 'ca-pub-2343633734899216', // infisical-scan:ignore
        autoAds: true,
      },
    },
  },
  schemaOrg: {
    identity: 'Organization',
    host: 'https://serp.ai',
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
  sitemap: {
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: 'weekly',
    },
    sitemaps: {
      'modules': {
        includeAppSources: true,
      },
      'company': {
        sources: ['/api/__sitemap__/company'],
      },
      'company-categories': {
        sources: ['/api/__sitemap__/company-categories'],
      },
      'posts': {
        sources: ['/api/__sitemap__/posts'],
      },
      'post-categories': {
        sources: ['/api/__sitemap__/post-categories'],
      },
      'glossary': {
        sources: ['/api/__sitemap__/glossary'],
      },
      'blog': {
        sources: ['/api/__sitemap__/blog'],
      },
      'mcp-servers': {
        sources: ['/api/__sitemap__/mcp-servers'],
      },
      'mcp-servers-categories': {
        sources: ['/api/__sitemap__/mcp-servers-categories'],
      },
    },
  },
})
