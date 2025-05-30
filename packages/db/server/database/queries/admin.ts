import { eq, desc, count } from 'drizzle-orm';
import { getDb } from '../index';
import { feedback, subscriber, user, team } from '../schema';

type Feedback = typeof feedback.$inferSelect;
type InsertFeedback = typeof feedback.$inferInsert;
type InsertSubscriber = typeof subscriber.$inferInsert;

export const createFeedback = async (payload: InsertFeedback) => {
  const [feedbackRecord] = await getDb()
    .insert(feedback)
    .values(payload)
    .returning()
    .execute();
  return feedbackRecord;
};

export const getAllFeedback = async () => {
  const rows = await getDb()
    .select()
    .from(feedback)
    .leftJoin(user, eq(user.id, feedback.userId))
    .orderBy(desc(feedback.createdAt))
    .execute();

  const feedbackRecords = rows.map(({ feedback: fb, user: usr }) => {
    if (usr) {
      const { hashedPassword, ...safeUser } = usr as unknown;
      return { ...fb, user: safeUser };
    }
    return { ...fb, user: null };
  });

  return feedbackRecords;
};

export const updateFeedback = async (
  id: number,
  payload: Partial<Feedback>
) => {
  const [feedbackRecord] = await getDb()
    .update(feedback)
    .set(payload)
    .where(eq(feedback.id, id))
    .returning()
    .execute();
  return feedbackRecord;
};

export const deleteFeedback = async (id: number) => {
  const feedbackRecord = await getDb()
    .delete(feedback)
    .where(eq(feedback.id, id))
    .returning()
    .execute();
  return feedbackRecord;
};

export const getFeedbackById = async (id: number) => {
  const [row] = await getDb()
    .select()
    .from(feedback)
    .leftJoin(user, eq(user.id, feedback.userId))
    .where(eq(feedback.id, id))
    .execute();

  if (!row) return null;
  if (row.user) delete (row.user as unknown).hashedPassword;
  return { ...row.feedback, user: row.user };
};

export const getFeedbackByUserId = async (userId: number) => {
  const feedbackRecords = await getDb()
    .select()
    .from(feedback)
    .where(eq(feedback.userId, userId))
    .execute();
  return feedbackRecords;
};

export const insertSubscriber = async (payload: InsertSubscriber) => {
  const [subscriberRecord] = await getDb()
    .insert(subscriber)
    .values(payload)
    .returning()
    .execute();
  return subscriberRecord;
};

export const getAllSubscribers = async () => {
  const subscribers = await getDb().select().from(subscriber).execute();
  return subscribers;
};

export const getOverviewCounts = async () => {
  const db = getDb();

  const [userCountResult] = await db
    .select({ count: count() })
    .from(user)
    .execute();

  const [teamCountResult] = await db
    .select({ count: count() })
    .from(team)
    .execute();

  const [feedbackCountResult] = await db
    .select({ count: count() })
    .from(feedback)
    .execute();

  const [subscriberCountResult] = await db
    .select({ count: count() })
    .from(subscriber)
    .execute();

  return {
    users: userCountResult.count,
    teams: teamCountResult.count,
    feedback: feedbackCountResult.count,
    newsletter: subscriberCountResult.count
  };
};
