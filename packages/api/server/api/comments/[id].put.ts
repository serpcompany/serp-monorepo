import { getDb } from '@serp/db/server/database';
import { comment } from '@serp/db/server/database/schema';
import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const userId = session?.user?.id;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) return { status: 400, message: 'ID is required' };

    const {
      commentId,
      comment: bodyComment,
      timestamp,
      module
    } = await readBody(event);
    if (!commentId || !bodyComment || !timestamp) {
      return {
        status: 400,
        message: '`commentId`, `comment`, and `timestamp` are required'
      };
    }

    const updatedComment = await getDb()
      .update(comment)
      .set({
        content: bodyComment,
        updatedAt: new Date()
      })
      .where(
        and(
          eq(comment.id, commentId),
          eq(comment.user, userId),
          eq(comment.entity, id)
        )
      )
      .returning();

    if (!updatedComment || updatedComment.length === 0) {
      return { status: 500, message: 'Failed to update comment' };
    }

    return { status: 200, message: 'success', id: updatedComment[0].id };
  } catch (error: unknown) {
    return { status: 500, message: error.message };
  }
});
