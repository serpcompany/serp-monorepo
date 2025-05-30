import { getDb } from '../index';
import {
  emailVerificationCode,
  oneTimePassword,
  passwordResetToken
} from '../schema';
import { and, count, eq, lt } from 'drizzle-orm';
import { generateAlphaNumericCode } from '@serp/utils/server';

type InsertEmailVerificationCode = typeof emailVerificationCode.$inferInsert;
type InsertOneTimePassword = typeof oneTimePassword.$inferInsert;

export const countEmailVerificationCodes = async (userId: number) => {
  try {
    const result = await getDb()
      .select({ count: count() })
      .from(emailVerificationCode)
      .where(eq(emailVerificationCode.userId, userId))
      .execute();

    return result[0]?.count;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to count verification codes');
  }
};

export const saveEmailVerificationCode = async (
  payload: InsertEmailVerificationCode
) => {
  try {
    const [record] = await getDb()
      .insert(emailVerificationCode)
      .values(payload)
      .returning()
      .execute();

    return record;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create verification code');
  }
};

export const saveOneTimePassword = async (payload: InsertOneTimePassword) => {
  try {
    const [record] = await getDb()
      .insert(oneTimePassword)
      .values(payload)
      .returning()
      .execute();

    return record;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create one time password');
  }
};

export const findEmailVerificationCode = async (token: string) => {
  try {
    const [record] = await getDb()
      .select()
      .from(emailVerificationCode)
      .where(eq(emailVerificationCode.code, token))
      .execute();

    return record ?? null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to find verification code');
  }
};

export const deleteExpiredEmailVerificationCodes = async (userId: number) => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 1_000 * 60 * 30);

    await getDb()
      .delete(emailVerificationCode)
      .where(
        and(
          eq(emailVerificationCode.userId, userId),
          lt(emailVerificationCode.expiresAt, thirtyMinutesAgo)
        )
      )
      .execute();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete expired verification codes');
  }
};

export const deleteEmailVerificationCode = async (userId: number) => {
  try {
    await getDb()
      .delete(emailVerificationCode)
      .where(eq(emailVerificationCode.userId, userId))
      .execute();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete verification code');
  }
};

export const findOneTimePassword = async (code: string) => {
  try {
    const [record] = await getDb()
      .select()
      .from(oneTimePassword)
      .where(eq(oneTimePassword.code, code))
      .execute();

    return record ?? null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to find one time password');
  }
};

export const deleteOneTimePassword = async (code: string) => {
  try {
    await getDb()
      .delete(oneTimePassword)
      .where(eq(oneTimePassword.code, code))
      .execute();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete one time password');
  }
};

export const createPasswordResetToken = async (userId: number) => {
  try {
    const token = generateAlphaNumericCode(32);

    const [record] = await getDb()
      .insert(passwordResetToken)
      .values({
        userId,
        code: token,
        expiresAt: new Date(Date.now() + 1_000 * 60 * 30) // 30 minutes
      })
      .returning()
      .execute();

    return record;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create password reset token');
  }
};

export const findPasswordResetToken = async (token: string) => {
  try {
    const [record] = await getDb()
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.code, token))
      .execute();

    return record ?? null;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to find password reset token');
  }
};

export const deletePasswordResetToken = async (token: string) => {
  try {
    await getDb()
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.code, token))
      .execute();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete password reset token');
  }
};
