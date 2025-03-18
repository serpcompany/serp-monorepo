// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  extends: [
    '@serp/types',
    process.env.DEPLOY_FROM_CLOUDFLARE === 'true'
      ? '@serp/utils-cloudflare-pages'
      : '@serp/utils'
  ],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/html-validator',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/scripts'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      useAuth: process.env.USE_AUTH === 'true'
    }
  }
});
