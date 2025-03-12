import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/api/db/schema',
  out: './server/api/db/migrations'
});
