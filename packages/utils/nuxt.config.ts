// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  extends: ['@serp/types'],
  modules: ['nuxt-auth-utils'],
  multiCache: {
    data: {
      enabled: true
    }
  },
  runtimeConfig: {
    oauth: {
      github: {
        clientId: process.env.AUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET
      },
      google: {
        clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET
      }
    },
    session: {
      maxAge: 60 * 60 * 24 * 30 // 30 days
    },
    public: {
      useAuth: process.env.USE_AUTH === 'true',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || '/api'
    }
  }
});
