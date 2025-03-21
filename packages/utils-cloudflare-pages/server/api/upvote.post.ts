import { useDrizzle } from './db';
import { getTableAndPKForModule } from '../utils/getTableAndPKForModule';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)

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

    await useDrizzle()
      .update(table)
      .set({
        upvotes: sql`
          CASE
            WHEN EXISTS (
              SELECT 1
              FROM json_each(
                CASE WHEN upvotes IS NULL OR upvotes = '' THEN '[]' ELSE upvotes END
              )
              WHERE json_each.value = ${email}
            )
            THEN (
              SELECT json_group_array(value)
              FROM json_each(
                CASE WHEN upvotes IS NULL OR upvotes = '' THEN '[]' ELSE upvotes END
              )
              WHERE value != ${email}
            )
            ELSE json_insert(
              CASE WHEN upvotes IS NULL OR upvotes = '' THEN '[]' ELSE upvotes END,
              '$[#]',
              ${email}
            )
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
