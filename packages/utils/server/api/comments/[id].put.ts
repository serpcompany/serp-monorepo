import { eq, sql } from 'drizzle-orm';
import { getServerSession } from '#auth';
import { db } from '@serp/utils/server/api/db';
import { getTableAndPKForModule } from '@serp/utils/server/utils/getTableAndPKForModule';

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) return { status: 401, message: 'Unauthorized' };

    const email = session.user?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) {
      return { status: 400, message: 'ID is required' };
    }

    const { commentId, comment, timestamp, parentIds, module } =
      await readBody(event);
    if (!commentId || !comment || !timestamp || !module) {
      return {
        status: 400,
        message:
          '`commentId`, `comment`, `module`, and `timestamp` are required'
      };
    }

    const { table, field } = getTableAndPKForModule(module);

    // If no parentIds, update a top-level comment
    if (!parentIds || parentIds.length === 0) {
      const updateQuery = sql`
                UPDATE ${table}
                SET comments = (
                    SELECT jsonb_agg(
                        CASE
                            WHEN elem->>'id' = ${commentId} AND elem->>'email' = ${email} THEN
                                jsonb_set(
                                    jsonb_set(elem, '{content}', ${sql.raw(`'${JSON.stringify(comment)}'::jsonb`)}, false),
                                    '{updatedAt}', ${sql.raw(`'${JSON.stringify(timestamp)}'::jsonb`)}, false
                                )
                            ELSE elem
                        END
                    )
                    FROM jsonb_array_elements(comments) AS t(elem)
                )
                WHERE ${field} = ${id}
                AND EXISTS (
                    SELECT 1
                    FROM jsonb_array_elements(comments) AS t(elem)
                    WHERE elem->>'id' = ${commentId} AND elem->>'email' = ${email}
                )
            `;

      const result = await db.execute(updateQuery);

      if (result.rowCount === 0) {
        return {
          status: 404,
          message:
            'Comment not found or you are not authorized to update this comment'
        };
      }

      return { status: 200, message: 'success', id: commentId };
    }

    // For nested comments
    // Build a string representation of path components
    const pathComponents = [];
    for (let i = 0; i < parentIds.length; i++) {
      const parentId = parentIds[i];
      pathComponents.push(
        `(SELECT (ordinality - 1)::text FROM jsonb_array_elements(comments${i === 0 ? '' : ` #> ARRAY[${pathComponents.join(', ')}, 'replies']::text[]`}) WITH ORDINALITY AS t(elem, ordinality) WHERE elem->>'id' = '${parentId}' LIMIT 1)`
      );
      pathComponents.push(`'replies'`);
    }

    // Add index for the comment itself
    const commentIndexPart = `(SELECT (ordinality - 1)::text FROM jsonb_array_elements(comments #> ARRAY[${pathComponents.join(', ')}]::text[]) WITH ORDINALITY AS t(elem, ordinality) WHERE elem->>'id' = '${commentId}' AND elem->>'email' = '${email}' LIMIT 1)`;

    // Final path that includes the comment index
    const fullPath = `ARRAY[${pathComponents.join(', ')}, ${commentIndexPart}]::text[]`;

    // Update the nested comment
    const updateNestedQuery = sql`
            UPDATE ${table}
            SET comments = jsonb_set(
                comments,
                ${sql.raw(fullPath)},
                jsonb_set(
                    jsonb_set(comments #> ${sql.raw(fullPath)}, '{content}', ${sql.raw(`'${JSON.stringify(comment)}'::jsonb`)}, false),
                    '{updatedAt}', ${sql.raw(`'${JSON.stringify(timestamp)}'::jsonb`)}, false
                ),
                false
            )
            WHERE ${field} = ${id}
            AND EXISTS (
                SELECT 1
                FROM jsonb_array_elements(comments #> ARRAY[${sql.raw(pathComponents.join(', '))}]::text[]) AS t(elem)
                WHERE elem->>'id' = ${commentId} AND elem->>'email' = ${email}
            )
        `;

    const result = await db.execute(updateNestedQuery);

    if (result.rowCount === 0) {
      return {
        status: 404,
        message:
          'Comment not found or you are not authorized to update this comment'
      };
    }

    return { status: 200, message: 'success', id: commentId };
  } catch (error) {
    console.error(error);
    return { status: 500, message: error.message };
  }
});
