// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  extends: [
    '@serp/types',
    '@serp/db',
    '@serp/auth',
    '@serp/utils',
    '@serp/notifications'
  ],
  modules: ['@nuxt/eslint', '@unlok-co/nuxt-stripe', '@nuxt/test-utils/module'],
  multiCache: {
    data: {
      enabled: true
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || '/api'
    }
  }
});
