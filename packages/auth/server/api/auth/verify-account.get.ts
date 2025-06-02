// flow
// 1. Validate query parameter (token)
// 2. Find and delete verification code (@method findAndDeleteEmailVerificationCode)
// 3. Check if token is expired (@method isWithinExpiryDate)
// 4. Find user by ID (@method findUserById)
// 5. Verify user's email if not already verified (@method verifyUser)
// 6. Check if user is banned
// 7. Update user's last active timestamp (@method updateLastActiveTimestamp)
// 8. Sanitize user data (@method sanitizeUser)
// 9. Set user session
// 10. Redirect to dashboard

// Used in:
// - emails/email-verification.vue

import {
  deleteEmailVerificationCode,
  findEmailVerificationCode,
} from '@serp/db/server/database/queries/auth';
import {
  findUserById,
  updateLastActiveTimestamp,
  verifyUser,
} from '@serp/db/server/database/queries/users';
import { isWithinExpiryDate, sanitizeUser } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event);
  if (!token) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('Missing verification token')}`,
    );
  }

  const storedToken = await findEmailVerificationCode(token as string);
  if (!storedToken) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('Invalid verification code')}`,
    );
  }

  const user = await findUserById(storedToken.userId);
  if (!user) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('User not found')}`,
    );
  }

  if (!isWithinExpiryDate(storedToken.expiresAt.getTime())) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('Verification code has expired. Please check your inbox or request a new verification email.')}&email=${encodeURIComponent(user.email)}`,
    );
  }

  if (!user.emailVerified) {
    await verifyUser(user.id);
  }

  if (user.banned && user.bannedUntil && user.bannedUntil > new Date()) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent('Your account has been banned')}`,
    );
  }

  await updateLastActiveTimestamp(user.id);
  await setUserSession(event, { user: sanitizeUser(user) });
  await deleteEmailVerificationCode(user.id);
  return sendRedirect(event, '/dashboard');
});
