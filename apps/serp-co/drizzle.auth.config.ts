import { defineConfig } from 'drizzle-kit'

import { env } from './env'

export default defineConfig({
  dialect: 'postgresql',
  schema: './auth/schema',
  out: './auth/migrations',
  dbCredentials: {
    url: env.AUTH_DATABASE_URL || '',
  },
  schemaFilter: ['user'],
})
