// flow
// 1. Validate body (email)
// 2. Find user by email (@method findUserByEmail)
// 3. Validate user status (email verified, not banned)
// 4. Generate verification codes:
//    - Email verification code (@method generateAlphaNumericCode)
//    - One-time password (@method generateNumericCode)
// 5. Save verification codes:
//    - Save email verification code (@method saveEmailVerificationCode)
//    - Save one-time password (@method saveOneTimePassword)
// 6. Render email template (@method render)
// 7. Send magic link email (@method sendEmail)
// 8. Return sanitized user data (@method sanitizeUser)

// Used in:
// - app/components/auth/MagicLinkLogin.vue

import { OneTimePasswordTypes } from '@serp/auth/constants'
import {
  saveEmailVerificationCode,
  saveOneTimePassword,
} from '@serp/db/server/database/queries/auth'
import { findUserByEmail } from '@serp/db/server/database/queries/users'
import { emailSchema } from '@serp/db/validations/auth'
import {
  generateAlphaNumericCode,
  generateNumericCode,
  sendEmail,
} from '@serp/utils/server'
import { validateBody } from '@serp/utils/server/utils/bodyValidation'
import { render } from '@vue-email/render'
import EmailVerification from '../../../../emails/magic-link.vue'

export default defineEventHandler(async (event) => {
  const data = await validateBody(event, emailSchema)

  const user = await findUserByEmail(data.email)
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }
  if (!user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User has not verified their email',
    })
  }

  if (user.banned && user.bannedUntil && user.bannedUntil > new Date()) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You account has been banned',
    })
  }

  const emailVerificationCode = generateAlphaNumericCode(32)
  const oneTimePassword = generateNumericCode(6)

  await saveEmailVerificationCode({
    userId: user.id,
    code: emailVerificationCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
  })

  await saveOneTimePassword({
    userId: user.id,
    identifier: data.email,
    code: oneTimePassword,
    type: OneTimePasswordTypes.login,
    expiresAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
  })

  const emailHtml = await render(EmailVerification, {
    otp: oneTimePassword,
    verificationCode: emailVerificationCode,
  })

  if (process.env.MOCK_EMAIL) {
    console.table({
      email: data.email,
      verificationLink: `${process.env.NUXT_PUBLIC_URL}/api/auth/verify-account?token=${emailVerificationCode}`,
      oneTimePassword,
    })
  }
  else {
    await sendEmail({
      subject: `Your login link for ${process.env.NUXT_PUBLIC_SITE_NAME}`,
      to: data.email,
      html: emailHtml,
    })
  }
  sendNoContent(event)
})
