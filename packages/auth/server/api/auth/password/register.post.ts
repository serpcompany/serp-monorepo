// flow
// 1. Validate body (email, name, password)
// 2. Check if user exists (@method findUserByEmail)
// 3. Hash the password (uses the hashPassword util provided by nuxt-auth-utils)
// 4. Create user (@method createUserWithPassword)
// 5. Automatically verify email if a valid invite code is present
// 6. Log in user if email verified
// 7. Generate verification code and send email for verification

// Used in:
// - app/pages/auth/register.vue

import type { AuthError } from '../../../utils/auth'
import { saveEmailVerificationCode } from '@serp/db/server/database/queries/auth'
import {
  acceptTeamInvite,
  getInvite,
  updateInviteStatus,
} from '@serp/db/server/database/queries/teams'
import {
  createUserWithPassword,
  findUserByEmail,
  updateLastActiveTimestamp,
  verifyUser,
} from '@serp/db/server/database/queries/users'
import { registerUserSchema } from '@serp/db/validations/auth'
import { generateAlphaNumericCode, sendEmail } from '@serp/utils/server'
import { validateBody } from '@serp/utils/server/utils/bodyValidation'
import { render } from '@vue-email/render'
import EmailVerification from '../../../../emails/email-verification.vue'
import { sanitizeUser, sendLoginNotification } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  // 1. Validate body
  const data = await validateBody(event, registerUserSchema)

  // 2. Check if user exists
  const existingUser = await findUserByEmail(data.email)
  if (existingUser) {
    // If user exists but email is not verified, show resend option
    if (!existingUser.emailVerified) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email not verified',
        needsVerification: true,
        email: data.email,
      } as AuthError)
    }

    // If user exists and email is verified, return error
    throw createError({
      statusCode: 400,
      statusMessage: 'An account with this email already exists, please login.',
    })
  }

  // 3. Hash the password
  const hashedPassword = await hashPassword(data.password)

  // 4. Create user
  const user = await createUserWithPassword({
    email: data.email,
    name: data.name,
    hashedPassword,
  })
  const sanitizedUser = sanitizeUser(user)

  // 5. Automatically verify email if a valid invite code is present
  if (data.inviteToken) {
    try {
      const invite = await getInvite(data.inviteToken) // Verify invitation code to prevent verification bypass
      await verifyUser(user.id)
      sanitizedUser.emailVerified = true
      await acceptTeamInvite(invite, user.id)
      await updateInviteStatus(invite.id, 'accepted')
      deleteCookie(event, 'invite-token')
      deleteCookie(event, 'invite-email')
    }
    catch (error) {
      console.log(
        `Error verifying token on registration: ${(error as Error).message || error}`,
      )
    }
  }

  // 6. Log in user if email verified
  if (sanitizedUser.emailVerified) {
    await updateLastActiveTimestamp(user.id)
    await setUserSession(event, { user: sanitizedUser })

    // Send login notification
    await sendLoginNotification({
      name: user.name,
      email: user.email,
    })
  }
  // 7. Generate verification code and send email for verification
  else {
    const emailVerificationCode = generateAlphaNumericCode(32)

    await saveEmailVerificationCode({
      userId: user.id,
      code: emailVerificationCode,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
    })

    const htmlTemplate = await render(EmailVerification, {
      verificationCode: emailVerificationCode,
    })

    if (process.env.MOCK_EMAIL) {
      console.table({
        email: data.email,
        name: data.name,
        verificationLink: `${process.env.NUXT_PUBLIC_URL}/api/auth/verify-account?token=${emailVerificationCode}`,
      })
    }
    else {
      await sendEmail({
        subject: `Welcome to ${process.env.NUXT_PUBLIC_SITE_NAME}`,
        to: data.email,
        html: htmlTemplate,
      })
    }
  }

  setResponseStatus(event, 201)
  return sanitizedUser
})
