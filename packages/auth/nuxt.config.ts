// https://nuxt.com/docs/api/configuration/nuxt-config
import vue from '@vitejs/plugin-vue';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils', '@nuxt/eslint'],
  eslint: {
    config: {
      standalone: false
    }
  },
  extends: ['@serp/db'],
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
  },
  nitro: {
    rollupConfig: {
      // @ts-expect-error - Rollup plugin type definitions are incomplete for vue plugin
      plugins: [vue()]
    }
  },
  auth: {
    webAuthn: true
  },
  stripe: {
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {}
    },
    client: {
      key: process.env.STRIPE_API_KEY,
      options: {}
    }
  }
});
