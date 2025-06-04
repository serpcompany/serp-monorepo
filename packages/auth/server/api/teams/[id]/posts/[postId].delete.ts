import { deletePost } from '@serp/db/server/database/queries/posts'
import { isTeamMember } from '@serp/db/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  const { id: teamId, postId } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  const hasAccess = await isTeamMember(teamId, user.id)
  if (!hasAccess) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized Access',
    })
  }
  const post = await deletePost(postId, teamId, user.id)
  return post
})
