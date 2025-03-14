import { db } from '@serp/utils/server/api/db';
import { companyCache } from '@serp/utils/server/api/db/schema';
import { eq, sql } from 'drizzle-orm';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) {
      return {
        status: 401,
        message: 'Unauthorized'
      };
    }

    const email = session.user?.email;
    if (!email) {
      return {
        status: 401,
        message: 'Unauthorized'
      };
    }

    const data = await readBody(event);

    await db
      .update(companyCache)
      .set({
        upvotes: sql`
      CASE 
        WHEN ${email} = ANY(COALESCE(upvotes, '{}'::text[]))
          THEN array_remove(COALESCE(upvotes, '{}'::text[]), ${email})
        ELSE array_append(COALESCE(upvotes, '{}'::text[]), ${email})
      END
    `
      })
      .where(eq(companyCache.id, data.id))
      .execute();

    return { status: 200, message: 'success' };
  } catch (error) {
    return { status: 500, message: error.message };
  }
});
