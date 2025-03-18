// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  extends: ['@serp/types'],
  modules: ['@sidebase/nuxt-auth'],
  multiCache: {
    data: {
      enabled: true
    }
  },
  auth: {
    baseURL:
      process.env.AUTH_ORIGIN || process.env.NUXT_PUBLIC_URL + '/api/auth',
    provider: {
      type: 'authjs',
      trustHost: false,
      addDefaultCallbackUrl: true
    }
  },
  runtimeConfig: {
    authOrigin:
      process.env.AUTH_ORIGIN || process.env.NUXT_PUBLIC_URL + '/api/auth',
    authSecret: process.env.AUTH_SECRET,
    public: {
      useAuth: process.env.USE_AUTH === 'true',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || '/api'
    }
  }
});
