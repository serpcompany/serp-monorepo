import { findLinkedAccountsByUserId } from '@serp/db/server/database/queries/users'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const linkedAccounts = await findLinkedAccountsByUserId(user.id)
  return linkedAccounts
})
