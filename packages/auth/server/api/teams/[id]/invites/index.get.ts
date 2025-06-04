import { getTeamInvites } from '@serp/db/server/database/queries/teams'
import { validateTeamOwnership } from '../../../../utils/teamValidation'

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id')
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }

  await validateTeamOwnership(event, teamId)
  const teamInvites = await getTeamInvites(teamId)
  return teamInvites
})
