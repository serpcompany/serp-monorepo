import { getDb } from '@serp/db/server/database'
import {
  category,
  entity,
  submitForm,
  topic,
} from '@serp/db/server/database/schema'
import { sendSlackNotification } from '@serp/notifications/server'
import { and, eq, inArray } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)
    const userId = session?.user?.id
    if (!userId)
      return { status: 401, message: 'Unauthorized' }

    const { module = '' } = getQuery(event)

    const data = await readBody(event)

    const blacklistKeys = ['id', 'uuid']

    // Remove blacklisted keys from data
    for (const key of blacklistKeys) {
      if (key in data) {
        Reflect.deleteProperty(data, key as keyof typeof data)
      }
    }

    // Ensure categories is an array of ids and that all exist in category
    if (data.categories) {
      if (!Array.isArray(data.categories)) {
        return {
          status: 400,
          message: 'Categories must be an array',
        }
      }

      const categories = await getDb()
        .select()
        .from(category)
        .where(
          and(
            inArray(category.id, data.categories),
            eq(category.module, module),
          ),
        )
        .limit(data.categories.length)
        .execute()

      if (categories.length !== data.categories.length) {
        return {
          status: 400,
          message: 'Invalid categories',
        }
      }
    }

    // Ensure topics is an array of ids and that all exist in topic
    if (data.topics) {
      if (!Array.isArray(data.topics)) {
        return {
          status: 400,
          message: 'Topics must be an array',
        }
      }
      const topics = await getDb()
        .select()
        .from(topic)
        .where(and(inArray(topic.id, data.topics), eq(topic.module, module)))
        .limit(data.topics.length)
        .execute()
      if (topics.length !== data.topics.length) {
        return {
          status: 400,
          message: 'Invalid topics',
        }
      }
    }

    // Ensure entity doesn't already exist
    const existingEntity = await getDb()
      .select()
      .from(entity)
      .where(
        and(
          eq(entity.slug, data.slug || data.domain),
          eq(entity.module, module),
        ),
      )
      .limit(1)
      .execute()

    if (existingEntity.length) {
      return {
        status: 400,
        message: 'Entity already exists',
      }
    }

    console.log('Entity data:', data)

    if (!data.id) {
      // Not an update
      // Ensure entity hasn't already been submitted
      const existingEntityForm = await getDb()
        .select()
        .from(submitForm)
        .leftJoin(entity, eq(submitForm.entity, entity.id))
        .where(
          and(
            eq(entity.slug, data.slug || data.domain),
            eq(entity.module, module),
          ),
        )
        .limit(1)
        .execute()

      if (existingEntityForm.length) {
        return {
          status: 400,
          message: 'Entity already submitted',
        }
      }
    }

    if (data.tags) {
      let tags = data.tags
      if (typeof tags === 'string') {
        tags = tags.split(',').map((tag: string) => tag.trim())
      }
      tags = [...new Set(tags)]
      data.tags = tags
    }

    if (data.id) {
      // Update existing submission
      await getDb()
        .update(submitForm)
        .set({
          formData: JSON.stringify(data),
          identifier: data.slug || data.domain,
          user: userId,
        })
        .where(eq(submitForm.id, data.id))
        .execute()
    }
    else {
      await getDb()
        .insert(submitForm)
        .values({
          formData: JSON.stringify(data),
          user: userId,
          entity: data.entity,
          module,
          identifier: data.slug || data.domain,
          status: 'pending',
          uuid: data.uuid,
        })
        .execute()

      // Send Slack notification
      sendSlackNotification({
        message: `New entity submission:
Data: ${JSON.stringify(data, null, 2)}
Submitted by: ${userId}
UUID: ${data.uuid}`,
      })
    }

    return {
      message: 'success',
    }
  }
  catch (error) {
    console.error('Error submitting entity:', error)
    return {
      status: error.statusCode || 500,
      message: error.message,
    }
  }
})
