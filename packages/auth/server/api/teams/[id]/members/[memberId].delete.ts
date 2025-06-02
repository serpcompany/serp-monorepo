import {
  deleteTeamMember,
  getActiveTeamMembers,
} from '@serp/db/server/database/queries/teams';
import { validateTeamOwnership } from '../../../../utils/teamValidation';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const teamId = getRouterParam(event, 'id');
  const memberId = getRouterParam(event, 'memberId');

  if (!teamId || !memberId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID and member ID are required',
    });
  }

  // Validate team ownership and get team details
  await validateTeamOwnership(event, teamId);

  // Get member details to check role
  const members = await getActiveTeamMembers(teamId);
  const memberToDelete = members.find((member) => member.id === memberId);

  if (!memberToDelete) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team member not found',
    });
  }

  // Prevent deletion of team owner
  if (memberToDelete.role === 'owner') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Cannot remove the team owner',
    });
  }

  await deleteTeamMember(teamId, memberId);
  return {
    message: 'Team member deleted successfully',
  };
});
