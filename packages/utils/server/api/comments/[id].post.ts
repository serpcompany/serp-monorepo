import { db } from '@serp/utils/server/api/db';
import { getTableAndPKForModule } from '@serp/utils/server/utils/getTableAndPKForModule';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);

    const email = session.user?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) {
      return { status: 400, message: 'ID is required' };
    }

    const { comment, timestamp, parentIds, module } = await readBody(event);
    if (!comment || !timestamp || !module) {
      return {
        status: 400,
        message: '`comment`, `module`, and `timestamp` are required'
      };
    }

    const { table, field } = getTableAndPKForModule(module);

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

    // Build a JSONB array literal for the new comment using jsonb_build_array.
    const newCommentLiteral = `jsonb_build_array('${JSON.stringify(newCommentObj)}'::jsonb)`;

    // If no parentIds, update the top-level comments.
    if (!parentIds || parentIds.length === 0) {
      await db
        .update(table)
        .set({
          comments: sql`COALESCE(comments, '[]'::jsonb) || ${sql.raw(newCommentLiteral)}`
        })
        .where(eq(field, id))
        .execute();
      return { status: 200, message: 'success' };
    }

    // Build the full JSON path dynamically.
    // We'll accumulate two things:
    //   1. An array of subqueries that compute each level's index.
    //   2. A nested JSON reference string that gets updated each time.
    const pathComponents = [];
    let currentReference = 'comments';
    for (let i = 0; i < parentIds.length; i++) {
      const parentId = parentIds[i];
      // For level 1, currentReference is "comments"; for deeper levels, it’s the parent's replies.
      const indexSubquery = `(SELECT (ordinality - 1)::text FROM jsonb_array_elements(${currentReference}) WITH ORDINALITY AS t(elem, ordinality) WHERE elem->>'id' = '${parentId}' LIMIT 1)`;
      // Push the computed index and then the literal 'replies'
      pathComponents.push(indexSubquery, "'replies'");
      // Update the currentReference for the next level:
      // We now drill down into the replies of the found parent.
      currentReference = `(${currentReference} #> ARRAY[${indexSubquery}, 'replies']::text[])`;
    }
    // The full path is the array of all these components.
    const fullPath = `ARRAY[${pathComponents.join(', ')}]::text[]`;

    // Now perform the update: use jsonb_set to update the nested replies array.
    const finalQuery = sql`
      UPDATE ${table}
      SET comments = jsonb_set(
        comments,
        ${sql.raw(fullPath)},
        COALESCE(comments #> ${sql.raw(fullPath)}, '[]'::jsonb) || ${sql.raw(newCommentLiteral)},
        false
      )
      WHERE ${field} = ${id}
    `;
    await db.execute(finalQuery);

    return { status: 200, message: 'success', id: newCommentId };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { status: 500, message: error.message };
  }
});
