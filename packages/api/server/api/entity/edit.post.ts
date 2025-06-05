import { getDb } from '@serp/db/server/database'
import { category, edit, entity, topic } from '@serp/db/server/database/schema'
import { editSubmissionSchema } from '@serp/db/schemas/edit-validation'
import { eq, inArray } from 'drizzle-orm'
import { ZodError } from 'zod'

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
    if (Number.isNaN(editId)) {
      return { status: 400, message: 'Invalid edit ID' }
    }

    const rawData = await readBody(event)

    // Validate the data using Zod schema
    let data
    try {
      data = editSubmissionSchema.parse(rawData)
    }
    catch (error) {
      if (error instanceof ZodError) {
        return { 
          status: 400, 
          message: `Validation error: ${error.errors.map(e => e.message).join(', ')}`
        }
      }
      throw error
    }

    // Ensure categories is an array of ids and that all exist in category table
    if (data.categories && data.categories.length > 0) {
      const categories = await getDb()
        .select()
        .from(category)
        .where(inArray(category.id, data.categories))
        .limit(data.categories.length)
        .execute()

      if (categories.length !== data.categories.length) {
        return {
          status: 400,
          message: 'Invalid categories: some category IDs do not exist',
        }
      }
    }

    // Ensure topics is an array of ids and that all exist in topic table
    if (data.topics && data.topics.length > 0) {
      const topics = await getDb()
        .select()
        .from(topic)
        .where(inArray(topic.id, data.topics))
        .limit(data.topics.length)
        .execute()
      if (topics.length !== data.topics.length) {
        return {
          status: 400,
          message: 'Invalid topics: some topic IDs do not exist',
        }
      }
    }

    // Ensure entity exists
    const existingEntity = await getDb()
      .select({
        id: entity.id,
      })
      .from(entity)
      .where(eq(entity.id, editId))
      .limit(1)
      .execute()

    if (!existingEntity.length) {
      return {
        status: 400,
        message: 'Entity with given id doesn\'t exists',
      }
    }

    await getDb()
      .insert(edit)
      .values({
        user: userId,
        entity: existingEntity[0].id,
        proposedChanges: JSON.stringify(data),
        status: 'pending',
      })
      .onConflictDoNothing()
      .execute()

    return {
      message: 'success',
    }
  }
  catch (error) {
    return {
      status: error.statusCode || 500,
      message: error.message,
    }
  }
})
