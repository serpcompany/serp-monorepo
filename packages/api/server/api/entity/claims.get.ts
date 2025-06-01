import { getDb } from '@serp/db/server/database'
import { entity, verification } from '@serp/db/server/database/schema'
import { and, eq, or, sql } from 'drizzle-orm'

/**
 * Get entity claims for the authenticated user
 * @param event - H3 event object containing request data
 * @returns Array of verification results or error response
 */
export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)
    const user = session?.user as { id: string } | undefined
    const userId = user?.id
    if (!userId)
      return { status: 401, message: 'Unauthorized' }

    const { module } = getQuery(event)

    // @todo - improve the typesafety of this after implementing zod
    const modules = (typeof module === 'string' ? module : String(module))
      .split(',')
      .map((mod: string) => mod.trim())
      .filter(Boolean)

    const whereConditions = [
      modules.length
        ? or(...modules.map((mod: string) => eq(entity.module, mod)))
        : sql`true`,
      eq(verification.user, userId),
    ]

    const verificationResults = await getDb()
      .select({
        id: entity.id,
        name: entity.name,
        slug: entity.slug,
        module: entity.module,
      })
      .from(entity)
      .innerJoin(verification, eq(verification.entity, entity.id))
      .where(and(...whereConditions))
      .execute()

    return verificationResults.length > 0 ? verificationResults : []
  }
  catch (error) {
    return { status: 500, message: error.message }
  }
})
