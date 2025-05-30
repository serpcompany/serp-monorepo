// flow
// 1. Store challenge for authentication attempt (@method storeWebAuthnChallenge)
// 2. Retrieve and validate challenge (@method getAndDeleteChallenge)
// 3. Get allowed credentials for user (@method findUserByEmail, findCredentialByUserId)
// 4. Validate credential (@method findCredentialById)
// 5. On successful authentication:
//    - Find user (@method findUserById)
//    - Update last active timestamp (@method updateLastActiveTimestamp)
//    - Sanitize user data (@method sanitizeUser)
//    - Set user session

// Used in:
// - app/pages/auth/login-passkey.vue

import type { H3Event } from 'h3';
import {
  storeWebAuthnChallenge,
  findCredentialByUserId,
  findCredentialById,
  getAndDeleteChallenge
} from '@serp/db/server/database/queries/passkeys';
import {
  findUserByEmail,
  findUserById,
  updateLastActiveTimestamp
} from '@serp/db/server/database/queries/users';
import { sanitizeUser, sendLoginNotification } from '../../../utils/auth';

export default defineWebAuthnAuthenticateEventHandler({
  async storeChallenge(event: H3Event, challenge: string, attemptId: string) {
    await storeWebAuthnChallenge(attemptId, challenge);
  },

  async getChallenge(event: H3Event, attemptId: string) {
    const challenge = await getAndDeleteChallenge(attemptId);
    if (!challenge) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Challenge not found or expired'
      });
    }
    return challenge;
  },

  async allowCredentials(event: H3Event, email: string) {
    const user = await findUserByEmail(email);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      });
    }
    const credentials = await findCredentialByUserId(user.id);
    return credentials || [];
  },

  async getCredential(event: H3Event, credentialId: string) {
    const credential = await findCredentialById(credentialId);
    if (!credential) {
      throw createError({
        statusCode: 404,
        statusMessage:
          'No passkeys registered. You can register one in your account settings.'
      });
    }
    return credential;
  },

  async onSuccess(
    event: H3Event,
    { credential }: { credential: { userId: number } }
  ) {
    const user = await findUserById(credential.userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      });
    }

    if (user.banned && user.bannedUntil && user.bannedUntil > new Date()) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You account has been banned'
      });
    }

    await updateLastActiveTimestamp(user.id);
    const transformedUser = sanitizeUser(user);
    await setUserSession(event, { user: transformedUser });

    // Send login notification
    await sendLoginNotification({
      name: user.name,
      email: user.email
    });
  }
});
