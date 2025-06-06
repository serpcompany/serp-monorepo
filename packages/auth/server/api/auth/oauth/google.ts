import type { OAuthUserData } from '../../../utils/oauth'
import { handleOAuthSuccess } from '../../../utils/oauth'

interface GoogleOAuthUser {
  sub: string
  given_name: string
  family_name: string
  picture: string
  email: string
}

function mapGoogleUser(
  user: GoogleOAuthUser,
): Omit<OAuthUserData, 'provider'> & { provider: 'google' } {
  return {
    email: user.email,
    name: `${user.given_name} ${user.family_name}`.trim(),
    avatarUrl: user.picture,
    provider: 'google' as const,
    providerUserId: user.sub,
  }
}

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    try {
      await handleOAuthSuccess(event, mapGoogleUser(user))
    }
    catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Authentication failed',
      })
    }
  },
})
