import { validateBody } from '@serp/utils/server/utils/bodyValidation';
import { phoneVerificationSchema } from '@serp/db/validations/auth';
import {
  findOneTimePassword,
  deleteOneTimePassword
} from '@serp/db/server/database/queries/auth';
import { isWithinExpiryDate } from '../../../utils/auth';
import { updateUser } from '@serp/db/server/database/queries/users';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const data = await validateBody(event, phoneVerificationSchema);

  const oneTimePassword = await findOneTimePassword(data.code);
  if (!oneTimePassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid code'
    });
  }

  if (!isWithinExpiryDate(oneTimePassword.expiresAt.getTime())) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Code has expired'
    });
  }

  if (oneTimePassword.identifier !== data.phoneNumber) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Code does not match the provided phone number'
    });
  }

  if (oneTimePassword.userId !== user.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Code does not belong to this user'
    });
  }

  await deleteOneTimePassword(data.code);

  const updatedUser = await updateUser(user.id, {
    phoneNumber: data.phoneNumber
  });

  const transformedUser = sanitizeUser(updatedUser);

  await setUserSession(event, { user: transformedUser });

  sendNoContent(event);
});
