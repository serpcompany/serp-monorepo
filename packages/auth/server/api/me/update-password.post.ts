import { updateUserPassword } from '@serp/db/server/database/queries/users';
import { updateUserPasswordSchema } from '@serp/db/validations/auth';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { password } = await readValidatedBody(event, (body) =>
    updateUserPasswordSchema.parse(body),
  );
  const hashedPassword = await hashPassword(password);
  await updateUserPassword(user.id, hashedPassword);
  return { message: 'Password updated successfully' };
});
