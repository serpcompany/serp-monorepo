import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@serp/utils-cloudflare-pages/server/api/db/schema';
export { sql, eq, and, or } from 'drizzle-orm';

export const tables = schema;
export function useDrizzle() {
  return drizzle(hubDatabase(), { schema });
}
