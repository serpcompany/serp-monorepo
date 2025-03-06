import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as authSchema from '@serp/auth/server/api/dbAuth/schema';

const authConnectionString = process.env.AUTH_DATABASE_URL;

const authClient = authConnectionString ? postgres(authConnectionString) : null;
const authDb = authConnectionString
  ? drizzle(authClient, { schema: authSchema })
  : null;

export { authDb, authClient };
