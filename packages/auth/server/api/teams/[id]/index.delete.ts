import {
  deleteTeam,
  findUserTeams,
} from '@serp/db/server/database/queries/teams';

export default defineEventHandler(async (event) => {
  // 1. Get authenticated user and team ID
  const { user } = await requireUserSession(event);
  const teamId = getRouterParam(event, 'id');

  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    });
  }

  // 2. Get user's teams to check ownership
  const userTeams = await findUserTeams(user.id);
  const team = userTeams.find((t) => t.id === teamId);

  if (!team) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team not found',
    });
  }

  // 3. Check if user is the owner
  if (team.role !== 'owner') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only team owners can delete teams',
    });
  }

  // 4. Delete the team
  await deleteTeam(teamId);

  return {
    message: 'Team deleted successfully',
  };
});
