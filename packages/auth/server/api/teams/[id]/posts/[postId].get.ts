import { getPostById } from '@serp/db/server/database/queries/posts';

export default defineEventHandler(async (event) => {
  const { id: teamId, postId } = getRouterParams(event);
  const { user } = await requireUserSession(event);
  const post = await getPostById(postId, teamId, user.id);
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found'
    });
  }
  return post;
});
