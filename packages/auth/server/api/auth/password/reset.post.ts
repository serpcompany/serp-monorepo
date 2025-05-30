// flow
// 1. Validate body (@method validateBody)
// 2. Find valid token (@method findPasswordResetToken)
// 3. Hash new password (@method hashPassword - provided by nuxt-auth-utils)
// 4. Update user password (@method updateUser)
// 5. Delete used token (@method deletePasswordResetToken)

import { z } from 'zod';
import { validateBody } from '@serp/utils/server/utils/bodyValidation';
import {
  findPasswordResetToken,
  deletePasswordResetToken
} from '@serp/db/server/database/queries/auth';
import { updateUser } from '@serp/db/server/database/queries/users';

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8)
});

export default defineEventHandler(async (event) => {
  // 1. Validate input
  const { token, password } = await validateBody(event, resetPasswordSchema);

  // 2. Find valid token
  const resetToken = await findPasswordResetToken(token);
  if (!resetToken || resetToken.expiresAt < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'This link has expired'
    });
  }

  // 3. Hash new password
  const hashedPassword = await hashPassword(password);

  // 4. Update user password
  await updateUser(resetToken.userId, { hashedPassword });

  // 5. Delete used token
  await deletePasswordResetToken(token);

  sendNoContent(event);
});
