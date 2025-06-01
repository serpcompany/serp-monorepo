import { createEnv } from '@t3-oss/env-nuxt'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().url().optional(),
    AUTH_DATABASE_URL: z.string().url().optional(),

    // Cache
    CACHE_PURGE_API_KEY: z.string().min(1).optional(),
    REDIS_URL: z.string().url().optional(),

    // Stripe
    STRIPE_SECRET_KEY: z.string().min(1).optional(),
    STRIPE_API_KEY: z.string().min(1).optional(),

    // Cloudflare R2
    CLOUDFLARE_R2_BUCKET: z.string().min(1).optional(),
    CLOUDFLARE_R2_ENDPOINT: z.string().url().optional(),
    CLOUDFLARE_R2_ACCESS_ID: z.string().min(1).optional(),
    CLOUDFLARE_R2_ACCESS_KEY: z.string().min(1).optional(),
    CLOUDFLARE_R2_PUBLIC_URL: z.string().url().optional(),

    // Monitoring
    OTEL_EXPORTER_ENDPOINT: z.string().url().optional(),

    // UI Pro
    NUXT_UI_PRO_LICENSE: z.string().min(1).optional(),

    // Environment
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    ROBOTS_ENV: z.enum(['staging', 'production']).optional(),
  },
  client: {
    NUXT_PUBLIC_SITE_NAME: z.string().min(1).optional(),
    NUXT_PUBLIC_DOMAIN: z.string().min(1).optional(),
    NUXT_PUBLIC_URL: z.string().url().optional(),
    NUXT_PUBLIC_API_URL: z.string().url().optional(),
  },
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`.
   */

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
