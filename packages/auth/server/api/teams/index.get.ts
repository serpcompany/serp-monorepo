import { findUserTeams } from '@serp/db/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  return findUserTeams(user.id)
})
