// server/utils/teamValidation.ts
import type { H3Event } from 'h3'
import { findUserTeams } from '@serp/db/server/database/queries/teams'

export async function validateTeamOwnership(
  event: H3Event,
  teamId: string,
): Promise<{ user: any, team: any }> {
  // 1. Get authenticated user
  const { user } = await requireUserSession(event)

  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }

  // 2. Get user's teams to check ownership
  const userTeams = await findUserTeams(user.id)
  const team = userTeams.find(t => t.id === teamId)

  if (!team) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team not found',
    })
  }

  // 3. Check if user is the owner
  if (team.role !== 'owner') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only team owners can perform this action',
    })
  }

  return { user, team }
}
