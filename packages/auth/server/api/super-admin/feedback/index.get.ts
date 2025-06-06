import { getAllFeedback } from '@serp/db/server/database/queries/admin'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  if (!user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this resource',
    })
  }
  const feedback = await getAllFeedback()
  return feedback
})
