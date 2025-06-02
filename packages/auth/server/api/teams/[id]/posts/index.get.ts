import { getAllPosts } from '@serp/db/server/database/queries/posts';
import { isTeamMember } from '@serp/db/server/database/queries/teams';

export default defineEventHandler(async (event) => {
  const { id: teamId } = getRouterParams(event);
  const { user } = await requireUserSession(event);
  const hasAccess = await isTeamMember(teamId, user.id);
  if (!hasAccess) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized Access',
    });
  }
  const posts = await getAllPosts(teamId);
  return posts;
});
