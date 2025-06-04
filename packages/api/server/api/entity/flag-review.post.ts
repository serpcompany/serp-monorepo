import { getDb } from '@serp/db/server/database'
import { review, verification } from '@serp/db/server/database/schema'
import { and, eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)
    const userId = session?.user?.id
    if (!userId)
      return { status: 401, message: 'Unauthorized' }

    const { id } = getQuery(event)
    if (!id) {
      return {
        status: 400,
        message: 'Review ID is required in the query params',
      }
    }

    const body = await readBody(event)
    const { notes } = body

    // Check if review exists to an entity the user is verified for
    const existingReview = await getDb()
      .select({ id: review.id })
      .from(review)
      .leftJoin(verification, eq(review.entity, verification.entity))
      .where(and(eq(review.id, id), eq(verification.user, userId)))
      .limit(1)
      .execute()

    if (existingReview.length === 0) {
      return { status: 404, message: 'Review not found' }
    }

    await getDb()
      .update(review)
      .set({
        updatedAt: sql`now()`,
        isFlagged: true,
        flaggedAt: sql`now()`,
        flaggedReason: notes,
        flaggedBy: userId,
      })
      .where(eq(review.id, existingReview[0].id))
      .execute()

    return { message: 'success' }
  }
  catch (error: unknown) {
    return { status: 500, message: error.message }
  }
})
