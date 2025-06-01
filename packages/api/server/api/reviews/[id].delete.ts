import { getDb } from '@serp/db/server/database';
import { review } from '@serp/db/server/database/schema';
import { and, eq } from 'drizzle-orm';
import { defineEventHandler, getRouterParams } from 'h3';

/**
 * Deletes a review for a specific entity by the authenticated user.
 * Only the user who created the review can delete it.
 * 
 * @param event - The H3 event object containing the entity ID in route params
 * @returns Object with deletion status and message
 */
export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);
    const user = session?.user as { id: string } | undefined;
    const userId = user?.id;
    if (!userId) return { status: 401, message: 'Unauthorized' };

    const { id } = getRouterParams(event);
    if (!id) {
      return { status: 400, message: 'ID is required' };
    }

    // Find the existing review by this user for the given entity
    const existingReview = await getDb()
      .select({ id: review.id })
      .from(review)
      .where(and(eq(review.entity, id), eq(review.user, userId)))
      .limit(1)
      .execute();

    if (existingReview.length === 0) {
      return { status: 404, message: 'Review not found for deletion' };
    }

    // Delete the review
    await getDb()
      .delete(review)
      .where(eq(review.id, existingReview[0].id))
      .execute();

    return { message: 'success' };
  } catch (error: unknown) {
    return { status: 500, message: (error as Error).message };
  }
});
