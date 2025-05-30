export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: [
    '@serp/utils',
    '@serp/stripe',
    '@serp/tools',
    '@serp/types',
    '@serp/ui'
  ],
  modules: [
    '@nuxt/ui-pro',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nuxt-multi-cache',
    'nuxt-security',
    'nuxt-link-checker',
    '@bg-dev/nuxt-s3'
  ],
  css: ['~/assets/css/main.css'],
  multiCache: {
    api: {
      enabled: true,
      prefix: '/__nuxt_multi_cache',
      authorization: process.env.CACHE_PURGE_API_KEY || 'xv12378asdfSDA123'
    }
  },
  stripe: {
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {}
    },
    client: {
      key: process.env.STRIPE_API_KEY,
      options: {}
    }
  },
  s3: {
    driver: 's3',
    bucket: process.env.CLOUDFLARE_R2_BUCKET,
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    region: 'auto',
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_ACCESS_KEY
  },
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
      cloudflareR2PublicUrl: process.env.CLOUDFLARE_R2_PUBLIC_URL,
      otelExporterEndpoint: process.env.OTEL_EXPORTER_ENDPOINT,
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      siteUrl: process.env.NUXT_PUBLIC_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      useAuth: true,
      forCloudflare: false,
      environment: process.env.NODE_ENV,
      profileDropdownLinks: [
        [
          {
            label: 'Get Featured',
            icon: 'i-lucide-star',
            to: '/users/get-featured/',
            color: 'success'
          },
          {
            label: 'Submit',
            icon: 'i-lucide-plus',
            to: '/users/submit/company/'
          },
          {
            label: 'Billing',
            icon: 'i-lucide-credit-card',
            to: '/users/manage/billing/'
          }
        ]
      ],
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
  security: {
    strict: true,
    rateLimiter: false,
    nonce: true, // Enable nonce for CSP
    ssg: {
      meta: true,
      hashScripts: true,
      hashStyles: false // Disable hash for styles to avoid hydration issues
    },
    headers: {
      contentSecurityPolicy: {
        'default-src': ["'self'"],

        // SCRIPT SOURCES - Fixed domain issues
        'script-src-elem': [
          "'self'",
          "'nonce-{{nonce}}'", // Add nonce support
          "'strict-dynamic'", // Enable strict-dynamic for better security

          // YOUR OWN INFRASTRUCTURE (all domains)
          'https://serp.co',
          'https://*.serp.co',
          'https://serp.ly',
          'https://*.serp.ly',
          'https://serp.ai',
          'https://*.serp.ai',
          'https://serp.media',
          'https://*.serp.media',

          // CLOUDFLARE SERVICES
          'https://static.cloudflareinsights.com',
          'https://*.cloudflare.com',

          // CHAT WIDGET
          'https://embed.tawk.to',

          // GOOGLE ANALYTICS & TAG MANAGER
          'https://www.googletagmanager.com',
          'https://*.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://*.google-analytics.com',

          // GOOGLE ADS
          'https://pagead2.googlesyndication.com',
          'https://*.googlesyndication.com',
          'https://googleads.g.doubleclick.net',
          'https://*.doubleclick.net',
          'https://*.googleapis.com',

          // YOUTUBE
          'https://www.youtube.com',
          'https://*.youtube.com',
          'https://www.youtube-nocookie.com',
          'https://*.youtube-nocookie.com'
        ],

        // STYLE SOURCES - Added missing domains
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          'data:',

          // All your domains for styles
          'https://*.serp.co',
          'https://*.serp.ly',
          'https://*.serp.ai',
          'https://*.serp.media',

          // Google Fonts if you use them
          'https://fonts.googleapis.com'
        ],

        // IMAGE SOURCES - Good as is
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'https:' // Allows hotlinking from anywhere
        ],

        // CONNECT SOURCES - Fixed typo and added missing domains
        'connect-src': [
          "'self'",

          // Your APIs (Fixed typo)
          'https://*.serp.co', // ← Fixed: was 'https://*serp.co'
          'https://*.serp.ly',
          'https://*.serp.ai',
          'https://*.serp.media',

          // Analytics
          'https://www.google-analytics.com',
          'https://*.google-analytics.com',
          'https://analytics.google.com',

          // WebSocket services
          'wss://embed.tawk.to',

          // Other APIs
          'https://api.stripe.com'
        ],

        // FRAME SOURCES - Good as is
        'frame-src': [
          "'self'",

          // Your own domains
          'https://serp.ly',
          'https://*.serp.ly',
          'https://serp.ai',
          'https://*.serp.ai',
          'https://serp.co',
          'https://*.serp.co',
          'https://serp.media',
          'https://*.serp.media',

          // Video platforms
          'https://*.youtube.com',
          'https://*.youtube-nocookie.com',
          'https://*.vimeo.com',

          // Maps
          'https://www.google.com',
          'https://maps.google.com',

          // Ads
          'https://pagead2.googlesyndication.com',
          'https://googleads.g.doubleclick.net',
          'https://*.googlesyndication.com',
          'https://*.doubleclick.net',
          'https://*.googleapis.com',

          // Other embeds
          'https://js.stripe.com' // ← Changed from https://stripe.com for Stripe Elements
        ],

        // FONT SOURCES - Added missing directive
        'font-src': [
          "'self'",
          'data:',
          'https://fonts.gstatic.com' // Google Fonts
        ],

        // MEDIA SOURCES - Good as is
        'media-src': ["'self'", 'blob:', 'https://*.youtube.com']
      },

      permissionsPolicy: {
        'picture-in-picture': [
          'self',
          '"https://www.youtube-nocookie.com"',
          '"https://www.youtube.com"'
        ],
        fullscreen: [
          'self',
          '"https://www.youtube-nocookie.com"',
          '"https://www.youtube.com"'
        ]
      },
      crossOriginEmbedderPolicy: 'unsafe-none'
    }
  },
  $development: {
    security: {
      headers: {
        contentSecurityPolicy: {
          // Keep all your base sources AND add dev-specific needs
          'script-src-elem': [
            "'self'",
            "'unsafe-eval'", // ← REQUIRED for Vite HMR
            "'nonce-{{nonce}}'", // Add nonce support for dev
            "'strict-dynamic'", // Enable strict-dynamic for dev

            // YOUR OWN INFRASTRUCTURE (all domains)
            'https://serp.co',
            'https://*.serp.co',
            'https://serp.ly',
            'https://*.serp.ly',
            'https://serp.ai',
            'https://*.serp.ai',
            'https://serp.media',
            'https://*.serp.media',

            // CLOUDFLARE SERVICES
            'https://static.cloudflareinsights.com',
            'https://*.cloudflare.com',

            // CHAT WIDGET
            'https://embed.tawk.to',

            // GOOGLE ANALYTICS & TAG MANAGER
            'https://www.googletagmanager.com',
            'https://*.googletagmanager.com',
            'https://www.google-analytics.com',
            'https://*.google-analytics.com',

            // GOOGLE ADS
            'https://pagead2.googlesyndication.com',
            'https://*.googlesyndication.com',
            'https://googleads.g.doubleclick.net',
            'https://*.doubleclick.net',
            'https://*.googleapis.com',

            // YOUTUBE
            'https://www.youtube.com',
            'https://*.youtube.com',
            'https://www.youtube-nocookie.com',
            'https://*.youtube-nocookie.com'
          ],

          'connect-src': [
            "'self'",

            // Dev-specific websockets - REQUIRED
            'ws://localhost:*',
            'ws://127.0.0.1:*',
            'http://localhost:*',

            // Include all your production connect sources
            'https://*.serp.co',
            'https://*.serp.ly',
            'https://*.serp.ai',
            'https://*.serp.media',
            'wss://embed.tawk.to',
            'https://www.google-analytics.com',
            'https://*.google-analytics.com'
          ]
        }
      }
    }
  },
  $production: {
    scripts: {
      registry: {
        googleTagManager: {
          id: 'GTM-WVF43L4'
        },
        googleAdsense: {
          client: 'ca-pub-2343633734899216', // infisical-scan:ignore
          autoAds: true
        }
      }
    }
  },
  schemaOrg: {
    identity: 'Organization',
    host: 'https://serp.co'
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
        includeAppSources: true,
        exclude: ['/users/**']
      },
      company: {
        sources: ['/api/__sitemap__/company']
      },
      ['company-categories']: {
        sources: ['/api/__sitemap__/company-categories']
      },
      ['service-providers']: {
        sources: ['/api/__sitemap__/service-providers']
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
