import type { user } from '@serp/db/server/database/schema';

type InsertUser = typeof user.$inferInsert;

export interface AuthError {
  statusCode: number;
  statusMessage: string;
  needsVerification?: boolean;
  email?: string;
}

export type SanitizedUser = Omit<
  InsertUser,
  'hashedPassword' | 'createdAt' | 'updatedAt' | 'lastActive' | 'phoneNumber'
>;

export function sanitizeUser(user: InsertUser, showBannedData = false): SanitizedUser {
  if (!showBannedData) {
    delete user.banned;
    delete user.bannedReason;
    delete user.bannedUntil;
  }
  delete user.hashedPassword;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.lastActive;
  delete user.phoneNumber;
  return user as SanitizedUser;
}

/**
 * Checks if a date is within the expiry date.
 *
 * @param expiresAt - The date to check.
 * @returns True if the date has not expired, false otherwise.
 */
export function isWithinExpiryDate(expiresAt: number): boolean {
  const currentTime = Date.now();
  return currentTime < expiresAt;
}

export async function sendLoginNotification(user: {
  name: string;
  email: string;
}): Promise<void> {
  try {
    await $fetch('/api/auth/login-notification', {
      method: 'POST',
      body: { user },
    });
  }
  catch (error) {
    // Silently fail as this is not critical
    console.error('Failed to send login notification:', error);
  }
}
