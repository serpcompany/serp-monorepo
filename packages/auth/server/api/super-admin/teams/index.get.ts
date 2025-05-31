import { getAllTeams } from '@serp/db/server/database/queries/teams'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  if (!user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this resource',
    })
  }
  const teams = await getAllTeams()
  return teams
})
