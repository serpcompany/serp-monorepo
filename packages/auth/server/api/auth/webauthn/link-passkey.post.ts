import {
  storeWebAuthnChallenge,
  getAndDeleteChallenge,
  createCredential
} from '@serp/db/server/database/queries/passkeys';
import type { InsertPasskey } from '@serp/db/types';
import { linkPasskeySchema } from '@serp/db/validations/auth';

export default defineWebAuthnRegisterEventHandler({
  async validateUser(userBody, event) {
    const session = await getUserSession(event);
    if (session.user?.email && session.user.email !== userBody.userName) {
      throw createError({
        statusCode: 400,
        message: 'Email not matching curent session'
      });
    }
    return linkPasskeySchema.parse(userBody);
  },

  async storeChallenge(event, challenge, attemptId) {
    await storeWebAuthnChallenge(attemptId, challenge);
  },

  async getChallenge(event, attemptId) {
    const challenge = await getAndDeleteChallenge(attemptId);
    if (!challenge)
      throw createError({ statusCode: 404, message: 'Challenge not found' });
    return challenge;
  },

  async onSuccess(event, { credential, user }) {
    const { user: sessionUser } = await requireUserSession(event);
    const passkey: InsertPasskey = {
      id: credential.id,
      name: user.displayName || 'Default Passkey',
      userId: sessionUser.id,
      publicKey: credential.publicKey,
      counter: credential.counter,
      backedUp: credential.backedUp,
      transports: credential.transports
    };
    await createCredential(passkey);
  }
});
