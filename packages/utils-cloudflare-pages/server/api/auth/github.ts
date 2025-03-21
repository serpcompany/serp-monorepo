import { handleOAuthSuccess } from '../../utils/oauth'

interface GitHubOAuthUser {
    email: string
    name: string
    avatar_url: string
    id: string
}

const mapGitHubUser = (user: GitHubOAuthUser) => ({
    email: user.email,
    name: user.name,
    image: user.avatar_url,
    provider: 'github' as const,
    providerUserId: user.id,
})

export default defineOAuthGitHubEventHandler({
    config: { emailRequired: true },
    async onSuccess(event, { user }) {
        try {
            await handleOAuthSuccess(event, mapGitHubUser(user))
        } catch (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Authentication failed',
            })
        }
    },
})