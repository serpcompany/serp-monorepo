import { cancelInvite } from '@serp/db/server/database/queries/teams';
import { validateTeamOwnership } from '../../../../../utils/teamValidation';

export default defineEventHandler(async (event) => {
  const teamId = getRouterParam(event, 'id');
  const inviteId = getRouterParam(event, 'inviteId');
  if (!teamId || !inviteId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID and invite ID are required',
    });
  }

  await validateTeamOwnership(event, teamId);
  await cancelInvite(inviteId);
  return 'Invite cancelled successfully';
});
