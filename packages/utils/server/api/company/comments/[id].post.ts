import { eq, sql } from 'drizzle-orm';
import { getServerSession } from '#auth';
import { db } from '@serp/utils/server/api/db';
import { companyCache } from '@serp/utils/server/api/db/schema';

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) return { status: 401, message: 'Unauthorized' };

    const email = session.user?.email;
    if (!email) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) return { status: 400, message: 'Company ID is required' };

    const { comment, timestamp, parentIds } = await readBody(event);
    if (!comment || !timestamp) {
      return { status: 400, message: 'Comment and timestamp are required' };
    }

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
        .update(companyCache)
        .set({
          comments: sql`COALESCE(comments, '[]'::jsonb) || ${sql.raw(newCommentLiteral)}`
        })
        .where(eq(companyCache.id, id))
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
      UPDATE ${companyCache}
      SET comments = jsonb_set(
        comments,
        ${sql.raw(fullPath)},
        COALESCE(comments #> ${sql.raw(fullPath)}, '[]'::jsonb) || ${sql.raw(newCommentLiteral)},
        false
      )
      WHERE id = ${id}
    `;
    await db.execute(finalQuery);

    return { status: 200, message: 'success', id: newCommentId };
  } catch (error) {
    console.error(error);
    return { status: 500, message: error.message };
  }
});
