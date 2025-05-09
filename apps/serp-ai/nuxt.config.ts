export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@serp/ui', '@serp/utils', '@serp/types'],
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    'nuxt-multi-cache',
    'nuxt-security',
    'nuxt-link-checker'
  ],
  ui: {
    colorMode: true
  },
  multiCache: {
    data: {
      enabled: true
    },
    api: {
      enabled: true,
      prefix: '/__nuxt_multi_cache',
      authorization: process.env.CACHE_PURGE_API_KEY || 'xv12378asdfSDA123'
    }
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
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      useAuth: true,
      environment: process.env.NODE_ENV,
      forCloudflare: false,
      copyrightText: '© SERP'
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
          id: 'GTM-M4ZSK3X'
        }
      }
    }
  },
  $development: {
    security: {
      headers: {
        contentSecurityPolicy: false
      }
    }
  },
  schemaOrg: {
    identity: 'Organization',
    host: 'https://serp.ai'
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
        'img-src': ["'self'", 'data:', 'https://*'],
        'script-src': ["'self'", "'unsafe-inline'", 'https://static.cloudflareinsights.com'],
        'script-src-elem': ["'self'", "'unsafe-inline'", 'https://static.cloudflareinsights.com'],
        'style-src': ["'self'", "'unsafe-inline'"],
        'frame-src': [
          'https://www.youtube-nocookie.com',
          'https://www.youtube.com',
          'https://serp.ly',
          'https://badges.serp.ai'
        ],
        'default-src': ["'self'"]
      },
      crossOriginEmbedderPolicy: 'unsafe-none'
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
      company: {
        sources: ['/api/__sitemap__/company']
      },
      ['company-categories']: {
        sources: ['/api/__sitemap__/company-categories']
      },
      posts: {
        sources: ['/api/__sitemap__/posts']
      },
      ['post-categories']: {
        sources: ['/api/__sitemap__/post-categories']
      },
      glossary: {
        sources: ['/api/__sitemap__/glossary']
      },
      blog: {
        sources: ['/api/__sitemap__/blog']
      },
      ['mcp-servers']: {
        sources: ['/api/__sitemap__/mcp-servers']
      },
      ['mcp-servers-categories']: {
        sources: ['/api/__sitemap__/mcp-servers-categories']
      }
    }
  }
});
