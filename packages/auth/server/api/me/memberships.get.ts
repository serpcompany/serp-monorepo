import { findUserTeams } from '@serp/db/server/database/queries/teams';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const teams = await findUserTeams(user.id);
  return teams;
});
