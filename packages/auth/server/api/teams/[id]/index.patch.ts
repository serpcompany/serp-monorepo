import {
  updateTeam,
  findUserTeams
} from '@serp/db/server/database/queries/teams';
import { createTeamSchema } from '@serp/db/validations/team';
import { validateBody } from '@serp/utils/server';

export default defineEventHandler(async (event) => {
  // 1. Get authenticated user and team ID
  const { user } = await requireUserSession(event);
  const teamId = getRouterParam(event, 'id');

  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required'
    });
  }

  // 2. Validate request body
  const body = await validateBody(event, createTeamSchema);

  // 3. Get user's teams to check ownership
  const userTeams = await findUserTeams(user.id);
  const team = userTeams.find((t) => t.id === teamId);

  if (!team) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team not found'
    });
  }

  // 4. Check if user is the owner
  if (team.role !== 'owner') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only team owners can update team details'
    });
  }

  // 5. Update team
  const updatedTeam = await updateTeam(teamId, {
    name: body.name,
    logo: body.logo
  });

  return updatedTeam;
});
