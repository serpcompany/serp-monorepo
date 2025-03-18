// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  extends: ['@serp/types'],
  modules: ['@nuxthub/core', '@sidebase/nuxt-auth'],
  hub: {
    database: true,
    databaseMigrationsDirs: ['server/db/migrations', 'server/api/db/migrations']
  },
  nitro: {
    experimental: {
      tasks: true
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
