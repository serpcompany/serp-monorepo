import { getDb } from '@serp/db/server/database'
import { edit } from '@serp/db/server/database/schema'
import { eq } from 'drizzle-orm'

/**
 * Get entity edits for the authenticated user
 * @param event - H3 event object containing request data with optional id query parameter
 * @returns Object containing edits array or error response
 */
export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)
    const user = session?.user as { id: string } | undefined
    const userId = user?.id
    if (!userId)
      return { status: 401, message: 'Unauthorized' }

    const { id } = getQuery(event)

    let edits
    if (id) {
      // if id, show all edits for that entity
      const entityId = Number.parseInt(id as string, 10)
      if (isNaN(entityId)) {
        return { status: 400, message: 'Invalid entity ID' }
      }
      edits = await getDb()
        .select()
        .from(edit)
        .where(eq(edit.entity, entityId))
        .execute()
    }
    else {
      // otherwise, show all edits the user has made
      edits = await getDb()
        .select()
        .from(edit)
        .where(eq(edit.user, userId))
        .execute()
    }

    return { edits }
  }
  catch (error: unknown) {
    return {
      status: error.statusCode || 500,
      message: error.message || 'Oops, something went wrong',
    }
  }
})
