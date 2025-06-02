// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  extends: ['@serp/types', '@serp/api'],
  modules: [
    '@nuxt/ui-pro',
    '@nuxtjs/html-validator',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/scripts',
    'nuxt-schema-org'
  ],
  eslint: {
    config: {
      standalone: false
    }
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      useAuth: process.env.USE_AUTH === 'true'
    }
  },
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE
  },
  typescript: {
    typeCheck: false,
    shim: false
  },
  htmlValidator: {
    ignore: [/\.(xml|rss|json|sql)$/, /^\/__nuxt_content\/.*$/]
  },
  nitro: {
    prerender: {
      ignore: ['/__nuxt_content/content/sql_dump']
    }
  }
});
