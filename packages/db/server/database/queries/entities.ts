import { eq } from 'drizzle-orm'
import { getDb } from '../index'
import { entity } from '../schema'

export async function getEntityById(id: number): Promise<typeof entity.$inferSelect | null> {
  const results = await getDb()
    .select()
    .from(entity)
    .where(eq(entity.id, id))
    .limit(1)
    .execute()

  return results.length > 0 ? results[0] : null
}
