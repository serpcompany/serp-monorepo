// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  extends: ['@serp/types'],
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'credentials',
      addDefaultCallbackUrl: true
    }
  },
  runtimeConfig: {
    authOrigin: process.env.AUTH_ORIGIN,
    authSecret: process.env.AUTH_SECRET
  }
});
