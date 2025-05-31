import { defineConfig } from 'drizzle-kit'
import { env } from './env'

export default defineConfig({
  dialect: 'postgresql',
  schema: './schema',
  out: './migrations',
  dbCredentials: {
    url: env.DATABASE_URL || '',
  },
  schemaFilter: ['cache'],
})
