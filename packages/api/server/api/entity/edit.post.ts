import { getDb } from '@serp/db/server/database'
import { category, edit, entity, topic } from '@serp/db/server/database/schema'
import { eq, inArray } from 'drizzle-orm'

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

    const data = await readBody(event)

    if (Object.keys(data).length === 0) {
      return { status: 400, message: 'No valid fields to update' }
    }

    // Ensure categories is an array of ids and that all exist in category table
    if (data.categories) {
      if (typeof data.categories === 'string') {
        data.categories = data.categories
          .split(',')
          .map((cat: string) => cat.trim())
      }
      if (!Array.isArray(data.categories)) {
        return {
          status: 400,
          message: 'Categories must be an array',
        }
      }

      const categories = await getDb()
        .select()
        .from(category)
        .where(inArray(category.id, data.categories))
        .limit(data.categories.length)
        .execute()

      if (categories.length !== data.categories.length) {
        return {
          status: 400,
          message: 'Invalid categories',
        }
      }
    }

    // Ensure topics is an array of ids and that all exist in topic table
    if (data.topics) {
      if (typeof data.topics === 'string') {
        data.topics = data.topics.split(',').map((cat: string) => cat.trim())
      }
      if (!Array.isArray(data.topics)) {
        return {
          status: 400,
          message: 'Topics must be an array',
        }
      }
      const topics = await getDb()
        .select()
        .from(topic)
        .where(inArray(topic.id, data.topics))
        .limit(data.topics.length)
        .execute()
      if (topics.length !== data.topics.length) {
        return {
          status: 400,
          message: 'Invalid topics',
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
