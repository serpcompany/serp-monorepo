import { getDb } from '@serp/db/server/database'
import { vote } from '@serp/db/server/database/schema'
import { eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)
    const userId = session?.user?.id
    if (!userId)
      return { status: 401, message: 'Unauthorized' }

    const data = await readBody(event)

    if (!data.id || !data.direction) {
      return {
        status: 400,
        message: 'ID is required',
      }
    }
    const { id, direction } = data
    // Assert direction is 1 or -1
    if (direction !== 1 && direction !== -1) {
      return {
        status: 400,
        message: 'Direction must be 1 or -1',
      }
    }
    // Check if the vote already exists
    const existingVote = await getDb()
      .select({
        id: vote.id,
        direction: vote.direction,
      })
      .from(vote)
      .where(eq(vote.entity, id), eq(vote.user, userId))
      .limit(1)
    if (existingVote.length > 0) {
      // If new direction is the same as existing, remove the vote
      if (existingVote[0].direction === direction) {
        await getDb()
          .delete(vote)
          .where(eq(vote.entity, id), eq(vote.user, userId))
      }
      // If new direction is different, update the vote
      else {
        await getDb()
          .update(vote)
          .set({
            direction,
          })
          .where(eq(vote.entity, id), eq(vote.user, userId))
      }
    }
    else {
      // Insert a new vote
      await getDb()
        .insert(vote)
        .values({
          entity: id,
          user: userId,
          direction,
          createdAt: sql`now()`,
        })
    }

    return { status: 200, message: 'success' }
  }
  catch (error) {
    console.error('Error in vote API:', error)
    return { status: 500, message: error.message }
  }
})
