import { unlinkAccount } from '@serp/db/server/database/queries/users'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { providerId } = getRouterParams(event)
  await unlinkAccount(user.id, providerId)
  sendNoContent(event)
})
