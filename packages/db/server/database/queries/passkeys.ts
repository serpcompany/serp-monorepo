import { getDb } from '../index';
import { webAuthnCredential, webAuthnChallenge } from '../schema';
import { and, eq, lt } from 'drizzle-orm';

type Passkey = typeof webAuthnCredential.$inferSelect;
type InsertPasskey = typeof webAuthnCredential.$inferInsert;
type InsertWebAuthnChallenge = typeof webAuthnChallenge.$inferInsert;

export const findCredentialByUserId = async (
  userId: number
): Promise<Passkey[]> => {
  try {
    const record = await getDb()
      .select()
      .from(webAuthnCredential)
      .where(eq(webAuthnCredential.userId, userId))
      .execute();
    return record;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to find credential by user id: ${error}`);
  }
};

export const createCredential = async (
  credential: InsertPasskey
): Promise<Passkey> => {
  try {
    const [record] = await getDb()
      .insert(webAuthnCredential)
      .values(credential)
      .returning()
      .execute();
    return record;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to create credential: ${error}`);
  }
};

export const storeWebAuthnChallenge = async (
  attemptId: string,
  challenge: string
): Promise<void> => {
  try {
    const challengeData: InsertWebAuthnChallenge = {
      id: attemptId,
      challenge,
      expiresAt: new Date(Date.now() + 60000)
    };
    await getDb().insert(webAuthnChallenge).values(challengeData).execute();
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to store challenge: ${error}`);
  }
};

export const getAndDeleteChallenge = async (
  attemptId: string
): Promise<string | undefined> => {
  try {
    // First, clean up expired challenges
    await getDb()
      .delete(webAuthnChallenge)
      .where(lt(webAuthnChallenge.expiresAt, new Date()))
      .execute();

    // Get the challenge
    const [record] = await getDb()
      .select()
      .from(webAuthnChallenge)
      .where(eq(webAuthnChallenge.id, attemptId))
      .execute();

    if (record) {
      // Delete the challenge
      await getDb()
        .delete(webAuthnChallenge)
        .where(eq(webAuthnChallenge.id, attemptId))
        .execute();
    }

    return record?.challenge;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get challenge: ${error}`);
  }
};

export const findCredentialById = async (
  credentialId: string
): Promise<Passkey | null> => {
  try {
    const [record] = await getDb()
      .select()
      .from(webAuthnCredential)
      .where(eq(webAuthnCredential.id, credentialId))
      .execute();
    return record || null;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to find credential by id: ${error}`);
  }
};

export const deleteCredential = async (
  userId: number,
  credentialId: string
): Promise<void> => {
  try {
    await getDb()
      .delete(webAuthnCredential)
      .where(
        and(
          eq(webAuthnCredential.userId, userId),
          eq(webAuthnCredential.id, credentialId)
        )
      )
      .execute();
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to delete credential: ${error}`);
  }
};
