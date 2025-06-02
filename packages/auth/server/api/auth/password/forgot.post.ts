// flow
// 1. Validate body (@method validateBody)
// 2. Find user (@method findUserByEmail)
// 3. Generate reset token (@method createPasswordResetToken)
// 4. Send email with reset link (@method sendEmail)

import { createPasswordResetToken } from '@serp/db/server/database/queries/auth';
import { findUserByEmail } from '@serp/db/server/database/queries/users';
import { emailSchema } from '@serp/db/validations/auth';
import { sendEmail } from '@serp/utils/server';
import { validateBody } from '@serp/utils/server/utils/bodyValidation';

export default defineEventHandler(async (event) => {
  // 1. Validate email
  const { email } = await validateBody(event, emailSchema);

  // 2. Find user
  const user = await findUserByEmail(email);
  if (!user) {
    // Return 200 even if user not found for security
    sendNoContent(event);
    return;
  }

  // 3. Generate reset token
  const resetToken = await createPasswordResetToken(user.id);

  // 4. Send email with reset link
  const resetUrl = `${process.env.NUXT_PUBLIC_URL}/auth/reset-password?token=${resetToken.code}`;

  if (process.env.MOCK_EMAIL) {
    console.table({
      email: user.email,
      resetLink: resetUrl,
    });
  } else {
    await sendEmail({
      subject: `Welcome to ${process.env.NUXT_PUBLIC_SITE_NAME}`,
      to: user.email,
      html: `Click <a href="${resetUrl}">here</a> to reset your password`,
    });
  }

  sendNoContent(event);
});
