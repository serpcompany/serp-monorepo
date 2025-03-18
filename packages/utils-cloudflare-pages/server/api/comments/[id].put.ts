import { eq, sql, and } from 'drizzle-orm';
import { getServerSession } from '#auth';
import { useDrizzle } from '../db';
import { getTableAndPKForModule } from '../../utils/getTableAndPKForModule';

export default defineEventHandler(async (event) => {
  try {
    // Authentication & basic validation
    const session = await getServerSession(event);
    if (!session) return { status: 401, message: 'Unauthorized' };
    const email = session.user?.email;
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
      parentIndices.forEach((idx) => {
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

    const result = await useDrizzle()
      .update(table)
      .set({ comments: sql.raw(updateExpr) })
      .where(and(eq(field, id), emailCondition))
      .execute();

    return { status: 200, message: 'success', id: commentIndex };
  } catch (error) {
    console.error(error);
    return { status: 500, message: error.message };
  }
});
