import { updateUser } from '@serp/db/server/database/queries/users';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const updatedUser = await updateUser(user.id, {
    phoneNumber: null,
  });
  return updatedUser;
});
