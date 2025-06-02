// flow
// 1. Validate body (email) and find user by email (@method findUserByEmail) and verify they are not already verified
// 2. Check if user has hit rate limit for verification emails
// 3. Save code to database (@method saveEmailVerificationCode)
// 4. Send email (@method sendEmail) and return success message

import {
  countEmailVerificationCodes,
  deleteExpiredEmailVerificationCodes,
  saveEmailVerificationCode,
} from '@serp/db/server/database/queries/auth'
import { findUserByEmail } from '@serp/db/server/database/queries/users'
import { generateAlphaNumericCode, sendEmail } from '@serp/utils/server'
import { validateBody } from '@serp/utils/server/utils/bodyValidation'
import { render } from '@vue-email/render'
import { z } from 'zod'
import EmailVerification from '../../../../emails/email-verification.vue'

const resendVerificationSchema = z.object({
  email: z.string().email(),
})

export default defineEventHandler(async (event) => {
  // 1. Validate body and find user by email
  const data = await validateBody(event, resendVerificationSchema)
  const user = await findUserByEmail(data.email)
  if (!user || user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'No account found with this email or it has already been verified.',
    })
  }

  // 2. Delete expired verification codes and check if user has hit rate limit for verification emails
  await deleteExpiredEmailVerificationCodes(user.id)
  const codeCount = await countEmailVerificationCodes(user.id)
  if (codeCount >= 3) {
    throw createError({
      statusCode: 429,
      statusMessage:
        'Too many emails have been sent recently. Please try again later.',
    })
  }

  // 3. Generate verification code and save code to database
  const emailVerificationCode = generateAlphaNumericCode(32)
  await saveEmailVerificationCode({
    userId: user.id,
    code: emailVerificationCode,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
  })

  // 4. Render email template and send
  const htmlTemplate = await render(EmailVerification, {
    verificationCode: emailVerificationCode,
  })
  if (process.env.MOCK_EMAIL) {
    console.table({
      email: data.email,
      name: user.name,
      verificationLink: `${process.env.NUXT_PUBLIC_URL}/api/auth/verify-account?token=${emailVerificationCode}`,
    })
  }
  else {
    await sendEmail({
      subject: `Verify your email for ${process.env.NUXT_PUBLIC_SITE_NAME}`,
      to: data.email,
      html: htmlTemplate,
    })
  }

  return {
    success: true,
    message: 'Verification email sent. Please check your inbox.',
  }
})
