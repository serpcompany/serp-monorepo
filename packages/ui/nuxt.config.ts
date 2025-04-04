// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  extends: ['@serp/types'],
  modules: [
    '@nuxt/ui-pro',
    '@nuxtjs/html-validator',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/scripts',
    'nuxt-schema-org'
  ],
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
  }
});
