import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: '../../packages/utils-cloudflare-pages/server/api/db/schema.ts',
  out: './server/api/db/migrations'
});
