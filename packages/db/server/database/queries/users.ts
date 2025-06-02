import { and, desc, eq, sql } from 'drizzle-orm'
import { H3Error } from 'h3'
import { getDb } from '../index'
import { oauthAccount, user } from '../schema'

type User = typeof user.$inferSelect
type InsertUser = typeof user.$inferInsert

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const [existingUser] = await getDb()
      .select()
      .from(user)
      .where(eq(user.email, email))
      .execute()
    return existingUser || null
  }
  catch (error) {
    console.error(error)
    return null
  }
}

export async function createUserWithPassword(payload: InsertUser) {
  try {
    const [record] = await getDb()
      .insert(user)
      .values(payload)
      .onConflictDoUpdate({
        target: user.email,
        set: {
          name: payload.name,
          hashedPassword: payload.hashedPassword,
        },
      })
      .returning()
      .execute()
    return record
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upsert user',
    })
  }
}

export async function findLinkedAccountsByUserId(userId: number) {
  try {
    const linkedAccounts = await getDb()
      .select()
      .from(oauthAccount)
      .where(eq(oauthAccount.userId, userId))
      .execute()
    return linkedAccounts
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find linked accounts by user ID',
    })
  }
}

export async function updateLastActiveTimestamp(userId: number): Promise<User> {
  try {
    const [record] = await getDb()
      .update(user)
      .set({ lastActive: new Date() })
      .where(eq(user.id, userId))
      .returning()
      .execute()
    return record
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update last active',
    })
  }
}

export async function findUserById(id: number) {
  try {
    const [userRecord] = await getDb()
      .select()
      .from(user)
      .where(eq(user.id, id))
      .execute()
    return userRecord || null
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find user by ID',
    })
  }
}

export async function verifyUser(userId: number) {
  try {
    const [record] = await getDb()
      .update(user)
      .set({ emailVerified: true })
      .where(eq(user.id, userId))
      .returning()
      .execute()
    return record
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to verify user',
    })
  }
}

export async function createUserWithOAuth(payload: InsertUser) {
  try {
    const [record] = await getDb()
      .insert(user)
      .values(payload)
      .onConflictDoUpdate({
        target: user.email,
        set: {
          name: payload.name,
          avatarUrl: payload.avatarUrl,
          emailVerified: true,
        },
      })
      .returning()
      .execute()
    return record
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user with OAuth',
    })
  }
}

export async function updateUser(userId: number, payload: Partial<User>) {
  try {
    if (payload.superAdmin) {
      delete payload.superAdmin
    }
    const [record] = await getDb()
      .update(user)
      .set({
        ...payload,
        updatedAt: sql`now()`,
      })
      .where(eq(user.id, userId))
      .returning()
      .execute()
    return record
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update user',
    })
  }
}

export async function updateUserPassword(userId: number, hashedPassword: string) {
  try {
    const [record] = await getDb()
      .update(user)
      .set({ hashedPassword })
      .where(eq(user.id, userId))
      .returning()
      .execute()
    return record
  }
  catch (error) {
    console.error(error)
    throw new Error('Failed to update user password')
  }
}

export async function linkOAuthAccount(userId: number, provider: string, providerUserId: string) {
  try {
    const [existingAccount] = await getDb()
      .select()
      .from(oauthAccount)
      .where(
        and(
          eq(oauthAccount.provider, provider),
          eq(oauthAccount.providerUserId, providerUserId),
        ),
      )
      .execute()

    if (existingAccount) {
      const [record] = await getDb()
        .update(oauthAccount)
        .set({ userId })
        .where(eq(oauthAccount.id, existingAccount.id))
        .returning()
        .execute()
      return record
    }
    else {
      const [record] = await getDb()
        .insert(oauthAccount)
        .values({
          userId,
          provider,
          providerUserId,
        })
        .returning()
        .execute()
      return record
    }
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to link OAuth account',
    })
  }
}

export async function findUserByPhoneNumber(phoneNumber: string) {
  try {
    const [userRecord] = await getDb()
      .select()
      .from(user)
      .where(eq(user.phoneNumber, phoneNumber))
      .execute()
    return userRecord || null
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to find user by phone number',
    })
  }
}

export async function unlinkAccount(userId: number, providerId: number) {
  try {
    const userRecord = await findUserById(userId)
    if (!userRecord) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }

    const linkedAccounts = await findLinkedAccountsByUserId(userId)

    if (!userRecord.hashedPassword && linkedAccounts.length <= 1) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'Cannot unlink the only authentication method. Please set a password first.',
      })
    }

    await getDb()
      .delete(oauthAccount)
      .where(
        and(eq(oauthAccount.userId, userId), eq(oauthAccount.id, providerId)),
      )
      .execute()
  }
  catch (error) {
    console.error(error)
    if (error instanceof H3Error && error.statusCode)
      throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to unlink account',
    })
  }
}

export async function deleteUser(userId: number) {
  await getDb().delete(user).where(eq(user.id, userId)).execute()
}

export async function getAllUsers(offset = 0, limit = 50) {
  const rows = await getDb()
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      emailVerified: user.emailVerified,
      lastActive: user.lastActive,
      oauthAccounts: sql<string[]>`array_agg(json_build_object(
        'id', ${oauthAccount.id},
        'provider', ${oauthAccount.provider},
        'providerUserId', ${oauthAccount.providerUserId},
        'createdAt', ${oauthAccount.createdAt},
        'updatedAt', ${oauthAccount.updatedAt}
      ))`,
    })
    .from(user)
    .leftJoin(oauthAccount, eq(oauthAccount.userId, user.id))
    .orderBy(desc(user.createdAt))
    .groupBy(user.id)
    .limit(limit)
    .offset(offset)
    .execute()

  return rows
}
