import { updateUser } from '@serp/db/server/database/queries/users'
import { updateUserSchema } from '@serp/db/validations/user'
import { validateBody } from '@serp/utils/server/utils/bodyValidation'
import { sanitizeUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await validateBody(event, updateUserSchema)
  const updatedUser = await updateUser(user.id, {
    name: body.name,
    avatarUrl: body.avatarUrl,
  })
  const sanitizedUser = sanitizeUser(updatedUser)
  await setUserSession(event, { user: sanitizedUser })
  return sanitizedUser
})
