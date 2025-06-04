import { deleteUser } from '@serp/db/server/database/queries/users'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  if (!user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this resource',
    })
  }
  const { userId } = await readBody(event)
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    })
  }

  await deleteUser(userId)
  sendNoContent(event)
})
