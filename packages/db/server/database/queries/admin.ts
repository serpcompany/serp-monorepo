import { count, desc, eq } from 'drizzle-orm'
import { getDb } from '../index'
import { feedback, subscriber, team, user } from '../schema'

type Feedback = typeof feedback.$inferSelect
type InsertFeedback = typeof feedback.$inferInsert
type InsertSubscriber = typeof subscriber.$inferInsert

/**
 * Creates a new feedback record in the database.
 * @param {InsertFeedback} payload - The feedback data to insert
 * @returns {Promise<Feedback>} The created feedback record
 * @throws {Error} If database insertion fails
 * @example
 * const feedback = await createFeedback({ user: 1, message: 'Great service!', status: 'pending' });
 */
export async function createFeedback(payload: InsertFeedback) {
  const [feedbackRecord] = await getDb()
    .insert(feedback)
    .values(payload)
    .returning()
    .execute()
  return feedbackRecord
}

/**
 * Retrieves all feedback records with associated user data.
 * Excludes sensitive user information like hashed passwords.
 * @returns {Promise<Array<Feedback & { user: Omit<User, 'hashedPassword'> | null }>>} Array of feedback records with user info
 * @throws {Error} If database query fails
 * @example
 * const feedbackList = await getAllFeedback();
 * console.log(feedbackList[0].user?.name); // User name if exists
 */
export async function getAllFeedback() {
  const rows = await getDb()
    .select()
    .from(feedback)
    .leftJoin(user, eq(user.id, feedback.user))
    .orderBy(desc(feedback.createdAt))
    .execute()

  const feedbackRecords = rows.map(({ feedback: fb, user: usr }) => {
    if (usr) {
      // eslint-disable-next-line ts/no-unused-vars
      const { hashedPassword, ...safeUser } = usr as unknown
      return { ...fb, user: safeUser }
    }
    return { ...fb, user: null }
  })

  return feedbackRecords
}

/**
 * Updates an existing feedback record by ID.
 * @param {number} id - The feedback record ID to update
 * @param {Partial<Feedback>} payload - The fields to update
 * @returns {Promise<Feedback>} The updated feedback record
 * @throws {Error} If feedback ID not found or database update fails
 * @example
 * const updated = await updateFeedback(123, { status: 'resolved', reply: 'Thanks for your feedback!' });
 */
export async function updateFeedback(id: number, payload: Partial<Feedback>) {
  const [feedbackRecord] = await getDb()
    .update(feedback)
    .set(payload)
    .where(eq(feedback.id, id))
    .returning()
    .execute()
  return feedbackRecord
}

/**
 * Deletes a feedback record by ID.
 * @param {number} id - The feedback record ID to delete
 * @returns {Promise<Feedback[]>} Array containing the deleted feedback record
 * @throws {Error} If feedback ID not found or database deletion fails
 * @example
 * const deleted = await deleteFeedback(123);
 * console.log('Deleted feedback:', deleted[0]);
 */
export async function deleteFeedback(id: number) {
  const feedbackRecord = await getDb()
    .delete(feedback)
    .where(eq(feedback.id, id))
    .returning()
    .execute()
  return feedbackRecord
}

/**
 * Retrieves a single feedback record by ID with associated user data.
 * Excludes sensitive user information like hashed passwords.
 * @param {number} id - The feedback record ID to retrieve
 * @returns {Promise<(Feedback & { user: Omit<User, 'hashedPassword'> | null }) | null>} Feedback record with user info or null if not found
 * @throws {Error} If database query fails
 * @example
 * const feedback = await getFeedbackById(123);
 * if (feedback) {
 *   console.log(feedback.message, feedback.user?.name);
 * }
 */
export async function getFeedbackById(id: number) {
  const [row] = await getDb()
    .select()
    .from(feedback)
    .leftJoin(user, eq(user.id, feedback.user))
    .where(eq(feedback.id, id))
    .execute()

  if (!row)
    return null
  if (row.user)
    delete (row.user as unknown).hashedPassword
  return { ...row.feedback, user: row.user }
}

/**
 * Retrieves all feedback records for a specific user.
 * @param {number} userId - The user ID to filter feedback by
 * @returns {Promise<Feedback[]>} Array of feedback records for the user
 * @throws {Error} If database query fails
 * @example
 * const userFeedback = await getFeedbackByUserId(456);
 * console.log(`User has ${userFeedback.length} feedback entries`);
 */
export async function getFeedbackByUserId(userId: number) {
  const feedbackRecords = await getDb()
    .select()
    .from(feedback)
    .where(eq(feedback.user, userId))
    .execute()
  return feedbackRecords
}

/**
 * Creates a new newsletter subscriber record.
 * @param {InsertSubscriber} payload - The subscriber data to insert
 * @returns {Promise<Subscriber>} The created subscriber record
 * @throws {Error} If database insertion fails or email already exists
 * @example
 * const subscriber = await insertSubscriber({ email: 'user@example.com', referrer: 'homepage' });
 */
export async function insertSubscriber(payload: InsertSubscriber) {
  const [subscriberRecord] = await getDb()
    .insert(subscriber)
    .values(payload)
    .returning()
    .execute()
  return subscriberRecord
}

/**
 * Retrieves all newsletter subscribers.
 * @returns {Promise<Subscriber[]>} Array of all subscriber records
 * @throws {Error} If database query fails
 * @example
 * const subscribers = await getAllSubscribers();
 * console.log(`Total subscribers: ${subscribers.length}`);
 */
export async function getAllSubscribers() {
  const subscribers = await getDb().select().from(subscriber).execute()
  return subscribers
}

/**
 * Retrieves count statistics for admin dashboard overview.
 * @returns {Promise<{ users: number; teams: number; feedback: number; newsletter: number }>} Count statistics for each entity type
 * @throws {Error} If database queries fail
 * @example
 * const stats = await getOverviewCounts();
 * console.log(`Users: ${stats.users}, Teams: ${stats.teams}`);
 */
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
