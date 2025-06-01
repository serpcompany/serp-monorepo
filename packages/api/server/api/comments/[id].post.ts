import { getDb } from '@serp/db/server/database'
import { comment } from '@serp/db/server/database/schema'
import { sql } from 'drizzle-orm'

/**
 * Creates a new comment for a specific entity with optional parent threading.
 * Requires authenticated user session for comment attribution.
 *
 * @param {H3Event} event - The event object containing entity ID and comment data
 * @returns {Promise<{status: number, message: string, id?: string}>}
 * @throws {Error} If comment insertion fails or user is unauthorized
 * @example
 * // POST /api/comments/123 with body: { comment: "Great tool!", parentIds: null }
 * // Creates new top-level comment for entity 123
 */
export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)
    const user = session?.user as { id: string } | undefined
    const userId = user?.id
    if (!userId)
      return { status: 401, message: 'Unauthorized' }

    const { id } = getRouterParams(event)
    const { module: _module } = getQuery(event)
    if (!id)
      return { status: 400, message: 'ID is required' }

    const {
      comment: bodyComment,
      parentIds,
      module: _bodyModule,
    } = await readBody(event)

    const newComment = {
      entity: id,
      user: userId,
      content: bodyComment,
      parentId:
        (Array.isArray(parentIds)
          ? parentIds[parentIds.length - 1]
          : parentIds) || null,
      createdAt: sql`now()`,
    }

    const inserted = await getDb()
      .insert(comment)
      .values(newComment)
      .returning()

    if (!inserted || inserted.length === 0) {
      return { status: 500, message: 'Failed to insert comment' }
    }
    const newCommentId = inserted[0].id

    return { status: 200, message: 'success', id: newCommentId }
  }
  catch (error) {
    return { status: 500, message: error.message }
  }
})
