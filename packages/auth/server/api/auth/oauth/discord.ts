import { handleOAuthSuccess } from '../../../utils/oauth';

interface DiscordOAuthUser {
  id: string;
  avatar: string;
  global_name: string;
  email: string;
}

const mapDiscordUser = (user: DiscordOAuthUser) => ({
  email: user.email,
  name: user.global_name,
  avatarUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
  provider: 'discord' as const,
  providerUserId: user.id
});

export default defineOAuthDiscordEventHandler({
  config: { emailRequired: true },
  async onSuccess(event, { user }) {
    try {
      await handleOAuthSuccess(event, mapDiscordUser(user));
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Authentication failed'
      });
    }
  }
});
