import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/api/db/schema',
  out: './server/api/db/migrations',
  dbCredentials: {
    url: `${process.env.DATABASE_URL}`
  },
  schemaFilter: ['cache']
});
