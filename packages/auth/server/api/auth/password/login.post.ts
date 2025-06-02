// Used in:
// - /auth/login.vue

import type { AuthError } from '../../../utils/auth'
import {
  findLinkedAccountsByUserId,
  findUserByEmail,
  updateLastActiveTimestamp,
} from '@serp/db/server/database/queries/users'
import { loginUserSchema } from '@serp/db/validations/auth'
import { validateBody } from '@serp/utils/server/utils/bodyValidation'
import { sanitizeUser, sendLoginNotification } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  // 1. Validate body
  const data = await validateBody(event, loginUserSchema)
  // 2. Find user by email
  const user = await findUserByEmail(data.email)
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }
  // 3. Check if user uses OAuth (should use OAuth login instead)
  if (!user.hashedPassword && user.emailVerified) {
    const linkedAccounts = await findLinkedAccountsByUserId(user.id)
    const providers = linkedAccounts.map(account => account.provider)
    // Function to capitalize provider names
    const formatProviderName = (provider: string): string =>
      provider.charAt(0).toUpperCase() + provider.slice(1)

    // Format the list of providers
    const formattedProviders = providers.map(formatProviderName)
    const providerList
      = formattedProviders.length > 1
        ? `${formattedProviders.slice(0, -1).join(', ')
        } and ${
          formattedProviders.slice(-1)[0]}`
        : formattedProviders[0]

    throw createError({
      statusCode: 400,
      statusMessage: `Your account is linked to ${providerList}. Please sign in using ${providers.length > 1 ? 'one of these providers' : 'this provider'} instead of password.`,
    })
  }
  // 4. Verify password
  if (!user.hashedPassword) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'This account was registered via a social login (e.g., Google, GitHub). Please use the same method to log in.',
    })
  }

  const isPasswordCorrect = await verifyPassword(
    user.hashedPassword,
    data.password,
  )

  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid password',
    })
  }

  // 5. Check if email is verified
  if (!user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email not verified',
      needsVerification: true,
      email: user.email,
    } as AuthError)
  }

  // 6. Check if user is banned
  if (user.banned && user.bannedUntil && user.bannedUntil > new Date()) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You account has been banned',
    })
  }

  // 7. Update last active timestamp
  await updateLastActiveTimestamp(user.id)

  // 8. Set user session
  await setUserSession(event, { user: sanitizeUser(user) })

  // Send login notification
  await sendLoginNotification({
    name: user.name,
    email: user.email,
  })

  sendNoContent(event)
})
