import { validateTeamOwnership } from '../../../../utils/teamValidation';
import { getActiveTeamMembers } from '@serp/db/server/database/queries/teams';

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id');
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required'
    });
  }

  await validateTeamOwnership(event, teamId);
  const teamMembers = await getActiveTeamMembers(teamId);
  return teamMembers;
});
