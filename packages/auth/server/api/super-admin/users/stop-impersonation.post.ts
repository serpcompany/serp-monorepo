export default defineEventHandler(async (event) => {
  // Get the current session - i.e the impersonated user
  const session = await getUserSession(event)

  if (!session.user?._impersonated) {
    throw createError({
      statusCode: 400,
      message: 'Not an impersonated session',
    })
  }

  const originalAdminSession = session.secure?.originalAdminSession
  if (!originalAdminSession) {
    await clearUserSession(event)
    return {
      success: true,
      message: 'Impersonation ended but original session was lost',
    }
  }

  await replaceUserSession(event, originalAdminSession)

  return { success: true, message: 'Returned to admin session' }
})
