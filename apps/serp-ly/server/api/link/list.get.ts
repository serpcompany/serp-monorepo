import { useDrizzle } from '@serp/utils-cloudflare-pages/server/api/db';
import { eq } from 'drizzle-orm';
import { shortLinks } from '@serp/utils-cloudflare-pages/server/api/db/schema';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  const email = (session.user as { email?: string })?.email;
  if (!email) {
    return {
      status: 401,
      message: 'Unauthorized'
    };
  }

  const results = await useDrizzle()
    .select()
    .from(shortLinks)
    .where(eq(shortLinks.email, email))
    .execute();

  return results;
});
