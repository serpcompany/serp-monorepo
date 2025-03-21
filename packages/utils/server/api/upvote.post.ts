import { db } from '@serp/utils/server/api/db';
import { getTableAndPKForModule } from '@serp/utils/server/utils/getTableAndPKForModule';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);

    const email = session.user?.email;
    if (!email) {
      return {
        status: 401,
        message: 'Unauthorized'
      };
    }

    const data = await readBody(event);

    if (!data.id || !data.module) {
      return {
        status: 400,
        message: 'ID and module are required'
      };
    }

    const { table, field } = getTableAndPKForModule(data.module);

    await db
      .update(table)
      .set({
        upvotes: sql`
      CASE 
        WHEN ${email} = ANY(COALESCE(upvotes, '{}'::text[]))
          THEN array_remove(COALESCE(upvotes, '{}'::text[]), ${email})
        ELSE array_append(COALESCE(upvotes, '{}'::text[]), ${email})
      END
    `
      })
      .where(eq(field, data.id))
      .execute();

    return { status: 200, message: 'success' };
  } catch (error) {
    return { status: 500, message: error.message };
  }
});
