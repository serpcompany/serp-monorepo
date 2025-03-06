import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/api/dbAuth/schema.ts',
  out: './server/api/dbAuth/migrations'
});
