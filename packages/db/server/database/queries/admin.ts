import { count, desc, eq } from 'drizzle-orm'
import { getDb } from '../index'
import { feedback, subscriber, team, user } from '../schema'

type Feedback = typeof feedback.$inferSelect
type InsertFeedback = typeof feedback.$inferInsert
type InsertSubscriber = typeof subscriber.$inferInsert

export async function createFeedback(payload: InsertFeedback) {
  const [feedbackRecord] = await getDb()
    .insert(feedback)
    .values(payload)
    .returning()
    .execute()
  return feedbackRecord
}

export async function getAllFeedback() {
  const rows = await getDb()
    .select()
    .from(feedback)
    .leftJoin(user, eq(user.id, feedback.userId))
    .orderBy(desc(feedback.createdAt))
    .execute()

  const feedbackRecords = rows.map(({ feedback: fb, user: usr }) => {
    if (usr) {
      const { hashedPassword, ...safeUser } = usr as unknown
      return { ...fb, user: safeUser }
    }
    return { ...fb, user: null }
  })

  return feedbackRecords
}

export async function updateFeedback(id: number, payload: Partial<Feedback>) {
  const [feedbackRecord] = await getDb()
    .update(feedback)
    .set(payload)
    .where(eq(feedback.id, id))
    .returning()
    .execute()
  return feedbackRecord
}

export async function deleteFeedback(id: number) {
  const feedbackRecord = await getDb()
    .delete(feedback)
    .where(eq(feedback.id, id))
    .returning()
    .execute()
  return feedbackRecord
}

export async function getFeedbackById(id: number) {
  const [row] = await getDb()
    .select()
    .from(feedback)
    .leftJoin(user, eq(user.id, feedback.userId))
    .where(eq(feedback.id, id))
    .execute()

  if (!row)
    return null
  if (row.user)
    delete (row.user as unknown).hashedPassword
  return { ...row.feedback, user: row.user }
}

export async function getFeedbackByUserId(userId: number) {
  const feedbackRecords = await getDb()
    .select()
    .from(feedback)
    .where(eq(feedback.userId, userId))
    .execute()
  return feedbackRecords
}

export async function insertSubscriber(payload: InsertSubscriber) {
  const [subscriberRecord] = await getDb()
    .insert(subscriber)
    .values(payload)
    .returning()
    .execute()
  return subscriberRecord
}

export async function getAllSubscribers() {
  const subscribers = await getDb().select().from(subscriber).execute()
  return subscribers
}

export async function getOverviewCounts() {
  const db = getDb()

  const [userCountResult] = await db
    .select({ count: count() })
    .from(user)
    .execute()

  const [teamCountResult] = await db
    .select({ count: count() })
    .from(team)
    .execute()

  const [feedbackCountResult] = await db
    .select({ count: count() })
    .from(feedback)
    .execute()

  const [subscriberCountResult] = await db
    .select({ count: count() })
    .from(subscriber)
    .execute()

  return {
    users: userCountResult.count,
    teams: teamCountResult.count,
    feedback: feedbackCountResult.count,
    newsletter: subscriberCountResult.count,
  }
}
