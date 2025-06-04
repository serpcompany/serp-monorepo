import { findCredentialByUserId } from '@serp/db/server/database/queries/passkeys'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const passkeys = await findCredentialByUserId(user.id)
  return {
    hasPasskey: passkeys && passkeys.length > 0,
  }
})
