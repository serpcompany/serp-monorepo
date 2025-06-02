import { getDb } from '@serp/db/server/database'
import {
  category,
  edit,
  entity,
  topic,
  verification,
} from '@serp/db/server/database/schema'
import { and, eq, inArray, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)
    const userId = session?.user?.id
    if (!userId)
      return { status: 401, message: 'Unauthorized' }

    const { id } = getQuery(event)
    if (!id) {
      return { status: 400, message: 'Missing edit ID in query' }
    }
    const editId = Number.parseInt(id as string, 10)
    if (isNaN(editId)) {
      return { status: 400, message: 'Invalid edit ID' }
    }

    const [editRow] = await getDb()
      .select({
        entity: edit.entity,
      })
      .from(edit)
      .where(eq(edit.id, editId))
      .limit(1)
      .execute()
    if (!editRow) {
      return { status: 404, message: 'Edit not found' }
    }
    const entityId = editRow.entity

    // Check verification: only the verified user for that entity may update
    const [verif] = await getDb()
      .select({ id: verification.id })
      .from(verification)
      .where(
        and(eq(verification.entity, entityId), eq(verification.user, userId)),
      )
      .limit(1)
      .execute()
    if (!verif) {
      return {
        status: 403,
        message: 'You are not verified to review edits for this company',
      }
    }

    // Pull in the body and only allow status + reviewNotes
    const body = await readBody(event)
    const updateData: Partial<typeof edit> = {}
    if (body.status !== undefined) {
      updateData.status = body.status
    }
    if (body.reviewNotes !== undefined) {
      updateData.reviewNotes = body.reviewNotes
    }
    if (Object.keys(updateData).length === 0) {
      return {
        status: 400,
        message: 'Nothing to update; allowed fields: status, reviewNotes',
      }
    }

    updateData.reviewedBy = userId
    updateData.reviewedAt = sql`now()`

    await getDb()
      .update(edit)
      .set(updateData)
      .where(eq(edit.id, editId))
      .execute()

    if (updateData.status === 'approved') {
      // If approved, update the company cache with the new data (main table will be updated in the next cron job)
      const updateData = await getDb()
        .select({ proposedChanges: edit.proposedChanges })
        .from(edit)
        .where(eq(edit.id, editId))
        .limit(1)
        .execute()
      if (!updateData.length) {
        return { status: 404, message: 'Edit not found' }
      }
      const raw = updateData[0].proposedChanges
      const proposedChanges = typeof raw === 'string' ? JSON.parse(raw) : raw

      const editData = proposedChanges

      if (Object.keys(editData).length === 0) {
        return { status: 400, message: 'No valid fields to update' }
      }

      // Ensure categories is an array of ids and that all exist in category
      if (body.categories) {
        if (typeof body.categories === 'string') {
          body.categories = body.categories
            .split(',')
            .map((cat: string) => cat.trim())
        }
        if (!Array.isArray(body.categories)) {
          return {
            status: 400,
            message: 'Categories must be an array',
          }
        }

        const categories = await getDb()
          .select()
          .from(category)
          .where(inArray(category.id, body.categories))
          .limit(body.categories.length)
          .execute()

        if (categories.length !== body.categories.length) {
          return {
            status: 400,
            message: 'Invalid categories',
          }
        }

        editData.categories = JSON.stringify(categories)
      }

      if (body.topics) {
        if (typeof body.topics === 'string') {
          body.topics = body.topics.split(',').map((cat: string) => cat.trim())
        }
        if (!Array.isArray(body.topics)) {
          return {
            status: 400,
            message: 'Topics must be an array',
          }
        }
        const topics = await getDb()
          .select()
          .from(topic)
          .where(inArray(topic.id, body.topics))
          .limit(body.topics.length)
          .execute()
        if (topics.length !== body.topics.length) {
          return {
            status: 400,
            message: 'Invalid topics',
          }
        }
        editData.topics = JSON.stringify(topics)
      }

      // Ensure entity exists
      const existingEntity = await getDb()
        .select({
          id: entity.id,
        })
        .from(entity)
        .where(eq(entity.id, entityId))
        .limit(1)
        .execute()

      if (!existingEntity.length) {
        return {
          status: 400,
          message: 'Entity with given id doesn\'t exists',
        }
      }

      if (Object.keys(editData).length !== 0) {
        // // Update the entity with the new data
        // await getDb()
        //     .update(entity)
        //     .set({
        //        data: editData
        //     })
        //     .where(eq(entity.id, entityId))
        //     .execute();
      }
    }

    return { message: 'success' }
  }
  catch (err) {
    return {
      status: err.statusCode || 500,
      message: err.message || 'Internal server error',
    }
  }
})
