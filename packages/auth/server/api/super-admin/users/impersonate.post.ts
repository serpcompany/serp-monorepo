import { findUserById } from '@serp/db/server/database/queries/users';

export default defineEventHandler(async (event) => {
  const adminSession = await requireUserSession(event);
  if (!adminSession.user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this resource'
    });
  }
  const body = await readBody(event);
  const { userId } = body;
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    });
  }

  const userToImpersonate = await findUserById(userId);

  if (!userToImpersonate) {
    throw createError({
      statusCode: 404,
      message: 'User not found'
    });
  }

  await setUserSession(event, {
    user: {
      ...userToImpersonate,
      _impersonated: true
    },
    secure: {
      originalAdminSession: adminSession
    }
  });

  return {
    success: true,
    impersonating: userToImpersonate.email || userToImpersonate.name
  };
});
