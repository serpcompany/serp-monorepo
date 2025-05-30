import { createTeam } from '@serp/db/server/database/queries/teams';
import { createTeamSchema } from '@serp/db/validations/team';
import { validateBody } from '@serp/utils/server';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await validateBody(event, createTeamSchema);
  const team = await createTeam({
    name: body.name,
    ownerId: user.id,
    slug: body.slug,
    logo: body.logo
  });
  return team;
});
