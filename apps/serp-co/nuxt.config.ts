export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@serp/ui', '@serp/utils', '@serp/tools', '@serp/types'],
  modules: [
    '@nuxt/ui-pro',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    'nuxt-multi-cache',
    'nuxt-security',
    'nuxt-link-checker',
    '@bg-dev/nuxt-s3'
  ],
  css: ['~/assets/css/main.css'],
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
      environment: process.env.NODE_ENV,
      profileDropdownLinks: [
        [
          {
            label: 'Submit',
            icon: 'i-lucide-plus',
            to: '/users/submit/company/'
          }
        ],
        [
          {
            label: 'Manage',
            type: 'label'
          },
          {
            label: 'Submissions',
            icon: 'i-lucide-file-text',
            to: '/users/submissions/'
          },
          {
            label: 'Billing',
            icon: 'i-lucide-credit-card',
            to: '/users/billing/'
          }
        ],
        [
          {
            label: 'Get Featured',
            icon: 'i-lucide-star',
            to: '/users/featured/',
            color: 'success'
          }
        ]
      ],
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
          label: 'Companies',
          children: [{ label: 'Companies', to: '/products/' }]
        },
        {
          label: 'Tools',
          children: [
            { label: 'Tools', to: '/tools/' },
            { label: 'Combine CSVs', to: '/tools/combine-csv-files/' },
            { label: 'JSON to CSV', to: '/tools/convert-json-to-csv/' },
            { label: 'Character Counter', to: '/tools/count-characters/' },
            { label: 'Paragraph Counter', to: '/tools/paragraph-counter/' }
          ]
        },
        {
          label: 'Glossary',
          children: [{ label: 'Glossary', to: '/glossary/' }]
        },
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
          items: [
            { text: 'Companies', slug: '/products/' },
            { text: 'Tools', slug: '/tools/' },
            { text: 'Posts', slug: '/posts/' },
            { text: 'Glossary', slug: '/glossary/' }
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
          id: 'GTM-WVF43L4'
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
      }
    }
  }
});
