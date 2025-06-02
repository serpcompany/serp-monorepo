import { generateAlphaNumericCode } from '@serp/utils/server'
import { and, count, eq, lt } from 'drizzle-orm'
import { getDb } from '../index'
import {
  emailVerificationCode,
  oneTimePassword,
  passwordResetToken,
} from '../schema'

type InsertEmailVerificationCode = typeof emailVerificationCode.$inferInsert
type InsertOneTimePassword = typeof oneTimePassword.$inferInsert

export async function countEmailVerificationCodes(userId: number): Promise<number | undefined> {
  try {
    const result = await getDb()
      .select({ count: count() })
      .from(emailVerificationCode)
      .where(eq(emailVerificationCode.userId, userId))
      .execute()

    return result[0]?.count
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to count verification codes')
  }
}

export async function saveEmailVerificationCode(payload: InsertEmailVerificationCode): Promise<typeof emailVerificationCode.$inferSelect> {
  try {
    const [record] = await getDb()
      .insert(emailVerificationCode)
      .values(payload)
      .returning()
      .execute()

    return record
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to create verification code')
  }
}

export async function saveOneTimePassword(payload: InsertOneTimePassword): Promise<typeof oneTimePassword.$inferSelect> {
  try {
    const [record] = await getDb()
      .insert(oneTimePassword)
      .values(payload)
      .returning()
      .execute()

    return record
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to create one time password')
  }
}

export async function findEmailVerificationCode(token: string): Promise<typeof emailVerificationCode.$inferSelect | null> {
  try {
    const [record] = await getDb()
      .select()
      .from(emailVerificationCode)
      .where(eq(emailVerificationCode.code, token))
      .execute()

    return record ?? null
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to find verification code')
  }
}

export async function deleteExpiredEmailVerificationCodes(userId: number): Promise<void> {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 1_000 * 60 * 30)

    await getDb()
      .delete(emailVerificationCode)
      .where(
        and(
          eq(emailVerificationCode.userId, userId),
          lt(emailVerificationCode.expiresAt, thirtyMinutesAgo),
        ),
      )
      .execute()
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to delete expired verification codes')
  }
}

export async function deleteEmailVerificationCode(userId: number): Promise<void> {
  try {
    await getDb()
      .delete(emailVerificationCode)
      .where(eq(emailVerificationCode.userId, userId))
      .execute()
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to delete verification code')
  }
}

export async function findOneTimePassword(code: string): Promise<typeof oneTimePassword.$inferSelect | null> {
  try {
    const [record] = await getDb()
      .select()
      .from(oneTimePassword)
      .where(eq(oneTimePassword.code, code))
      .execute()

    return record ?? null
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to find one time password')
  }
}

export async function deleteOneTimePassword(code: string): Promise<void> {
  try {
    await getDb()
      .delete(oneTimePassword)
      .where(eq(oneTimePassword.code, code))
      .execute()
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to delete one time password')
  }
}

export async function createPasswordResetToken(userId: number): Promise<typeof passwordResetToken.$inferSelect> {
  try {
    const token = generateAlphaNumericCode(32)

    const [record] = await getDb()
      .insert(passwordResetToken)
      .values({
        userId,
        code: token,
        expiresAt: new Date(Date.now() + 1_000 * 60 * 30), // 30 minutes
      })
      .returning()
      .execute()

    return record
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to create password reset token')
  }
}

export async function findPasswordResetToken(token: string): Promise<typeof passwordResetToken.$inferSelect | null> {
  try {
    const [record] = await getDb()
      .select()
      .from(passwordResetToken)
      .where(eq(passwordResetToken.code, token))
      .execute()

    return record ?? null
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to find password reset token')
  }
}

export async function deletePasswordResetToken(token: string): Promise<void> {
  try {
    await getDb()
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.code, token))
      .execute()
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to delete password reset token')
  }
}
