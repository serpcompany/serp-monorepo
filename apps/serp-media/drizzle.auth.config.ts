import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './auth/schema',
  out: './auth/migrations',
  dbCredentials: {
    url: `${process.env.AUTH_DATABASE_URL}`,
  },
  schemaFilter: ['user'],
})
