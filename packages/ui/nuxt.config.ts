// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  extends: ['@serp/types'],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/html-validator',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/scripts'
  ],
  css: ['~/assets/css/main.css']
});
