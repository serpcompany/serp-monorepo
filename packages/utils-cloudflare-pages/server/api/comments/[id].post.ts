import { eq, sql } from 'drizzle-orm';
import { useDrizzle } from '../db';
import { getTableAndPKForModule } from '../../utils/getTableAndPKForModule';

export default defineEventHandler(async (event) => {
  try {
    // Authentication & validation
    const session = await requireUserSession(event)
    const email = session.user?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) return { status: 400, message: 'ID is required' };

    const { comment, timestamp, parentIndices, module } = await readBody(event);
    if (!comment || !timestamp || !module) {
      return {
        status: 400,
        message: '`comment`, `module`, and `timestamp` are required'
      };
    }
    const { table, field } = getTableAndPKForModule(module);

    // Build the new comment object.
    const newCommentId = crypto.randomUUID();
    const newCommentObj = {
      id: newCommentId,
      email,
      name: session.user.name || '',
      image: session.user.image || '',
      content: comment,
      createdAt: timestamp,
      updatedAt: timestamp,
      replies: []
    };

    // IMPORTANT: When inserting, we wrap it in json(…) so that SQLite parses it as a JSON object.
    const newCommentJSON = JSON.stringify(newCommentObj).replace(/'/g, "''");

    if (!parentIndices || parentIndices.length === 0) {
      // Insert at the top level
      const updateExpr = `
        json_insert(
          COALESCE(comments, json('[]')),
          '$[#]',
          json('${newCommentJSON}')
        )
      `;
      await useDrizzle()
        .update(table)
        .set({ comments: sql.raw(updateExpr) })
        .where(eq(field, id))
        .execute();
      return { status: 200, message: 'success', id: newCommentId };
    }

    // Build a constant JSON path from parentIndices.
    // For example, if parentIndices = [0] then the path is "$[0].replies"
    let jsonPath = '$';
    parentIndices.forEach((index) => {
      jsonPath += `[${index}].replies`;
    });

    // Build the update expression.
    const updateExprNested = `
      json_set(
        comments,
        '${jsonPath}',
        json_insert(
          COALESCE(json_extract(comments, '${jsonPath}'), json('[]')),
          '$[#]',
          json('${newCommentJSON}')
        )
      )
    `;

    await useDrizzle()
      .update(table)
      .set({ comments: sql.raw(updateExprNested) })
      .where(eq(field, id))
      .execute();

    return { status: 200, message: 'success', id: newCommentId };
  } catch (error) {
    console.error(error);
    return { status: 500, message: error.message };
  }
});
