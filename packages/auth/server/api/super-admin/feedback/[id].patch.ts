import { updateFeedback } from '@serp/db/server/database/queries/admin'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  if (!user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this resource',
    })
  }

  const { id } = getRouterParams(event)
  const { status } = await readBody(event)
  const updatedFeedback = await updateFeedback(id, status)
  return updatedFeedback
})
