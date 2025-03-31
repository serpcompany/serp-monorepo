import type { User } from '@serp/types/types/User';
import { and, eq, sql } from 'drizzle-orm';
import { getTableAndPKForModule } from '../../utils/getTableAndPKForModule';
import { useDrizzle } from '../db';

export default defineEventHandler(async (event) => {
  try {
    // Authentication & basic validation
    const session = await requireUserSession(event);
    const email = (session.user as User)?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) return { status: 400, message: 'ID is required' };

    const { commentIndex, comment, timestamp, parentIndices, module } =
      await readBody(event);
    if (commentIndex === undefined || !comment || !timestamp || !module) {
      return {
        status: 400,
        message:
          '`commentIndex`, `comment`, `timestamp`, and `module` are required'
      };
    }

    const { table, field } = getTableAndPKForModule(module);

    // Build the constant JSON path.
    // For a top-level comment: "$[commentIndex]"
    // For a nested comment, build the path from parentIndices.
    let finalPath;
    if (!parentIndices || parentIndices.length === 0) {
      finalPath = `$[${commentIndex}]`;
    } else {
      let jsonPath = '$';
      parentIndices.forEach((idx: number) => {
        jsonPath += `[${idx}].replies`;
      });
      finalPath = `${jsonPath}[${commentIndex}]`;
    }

    // Build the update expression.
    // We update the JSON object at finalPath by replacing "content" and "updatedAt" fields.
    // Wrap new values in json(…) so that SQLite treats them as JSON values.
    const updateExpr = `
      json_set(
        comments,
        '${finalPath}',
        json_set(
          json_extract(comments, '${finalPath}'),
          '$.content',
          json('${JSON.stringify(comment).replace(/'/g, "''")}'),
          '$.updatedAt',
          json('${JSON.stringify(timestamp).replace(/'/g, "''")}')
        )
      )
    `;

    // Build the condition: only update if the email stored in the comment equals the session email.
    const emailCondition = eq(
      sql.raw(`json_extract(comments, '${finalPath}.email')`),
      email
    );

    await useDrizzle()
      .update(table)
      .set({ comments: sql.raw(updateExpr) })
      .where(and(eq(field, id), emailCondition))
      .execute();

    return { status: 200, message: 'success', id: commentIndex };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { status: 500, message: (error as Error).message };
  }
});
