import {
  acceptTeamInvite,
  getInvite,
  getTeam,
  isTeamMember,
  updateInviteStatus,
} from '@serp/db/server/database/queries/teams';
import {
  findUserById,
  verifyUser,
} from '@serp/db/server/database/queries/users';
import { z } from 'zod';

const querySchema = z.object({
  token: z.string().length(32, 'Invalid token'),
});

export default defineEventHandler(async (event) => {
  // 1. Validate token with type checking
  const { token } = await getValidatedQuery(
    event,
    querySchema.parse.bind(querySchema),
  );

  // 2. Get and validate invite
  let invite;
  try {
    invite = await getInvite(token);
  } catch (error) {
    return sendRedirect(
      event,
      `/auth/verification-error?message=${encodeURIComponent((error as Error).message)}`,
    );
  }

  // 3. Validate user session and permissions
  const session = await getUserSession(event);

  if (session.user) {
    if (session.user.email !== invite.email) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Unauthorized invite',
      });
    }
  }

  if (!session.user || !(await findUserById(session.user.id))) {
    setCookie(event, 'invite-token', token, {
      maxAge: 60 * 60 * 24, // discard cookie after 1 day
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    });
    setCookie(event, 'invite-email', invite.email, {
      maxAge: 60 * 60 * 24, // discard cookie after 1 day
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    });
    return sendRedirect(event, '/auth/register', 302);
  }

  // 4. Check if user is already a team member
  const isAlreadyMember = await isTeamMember(invite.teamId, session.user.id);
  if (isAlreadyMember) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You are already a member of this team',
    });
  }

  // 5. Skip verifying user's email if they used an invite link
  if (invite.email === session.user.email) {
    await verifyUser(session.user.id);
  }

  // 6. Process invite acceptance
  await acceptTeamInvite(invite, session.user.id);
  await updateInviteStatus(invite.id, 'accepted', session.user.id);
  deleteCookie(event, 'invite-token');
  deleteCookie(event, 'invite-email');

  // 7. Get the team's slug for the redirect
  const team = await getTeam(invite.teamId);
  if (!team) {
    return sendRedirect(event, '/dashboard', 302);
  }

  // 8. Set this team as the last used team
  setCookie(event, 'lastTeamSlug', team.slug, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
  });

  // 9. Redirect to the team dashboard
  return sendRedirect(event, `/dashboard/${team.slug}`, 302);
});
