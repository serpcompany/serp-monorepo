import type { Team } from '@serp/db/types/database';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const paramSlug =
    (Array.isArray(to.params.team) ? to.params.team[0] : to.params.team) || '';
  const toast = useToast();
  const { loggedIn } = useUserSession();
  const teams = useState<Team[]>('teams', () => []);
  const teamSlug = useState<string>('teamSlug');

  function handleTeamRedirect() {
    const { getLastUsedTeam, setLastUsedTeam } = useTeamPreferences();
    // Redirect to user dashboard if no teams
    const memberships = teams.value;
    const firstTeam = memberships[0];
    if (!firstTeam) {
      return navigateTo('/dashboard/onboard');
    }
    const lastTeamSlug = getLastUsedTeam();
    const targetTeam =
      memberships.find((team) => team.slug === lastTeamSlug) || firstTeam;

    // Update last used team and redirect
    setLastUsedTeam(targetTeam.slug);
    return navigateTo(`/dashboard/${targetTeam.slug}`);
  }

  // Redirect to login if not logged in
  if (!loggedIn.value) {
    toast.add({
      title: 'You must be logged in to access this page',
      color: 'error',
    });
    if (teamSlug.value) teamSlug.value = '';
    if (teams.value.length) teams.value = [];
    return await navigateTo('/auth/login');
  }

  // Check for invite token, this means the user was not logged in or did not have an account when they clicked the verification link,
  // but now has successfully logged in or created an account and can verify the invite
  const inviteToken = useCookie('invite-token');
  if (inviteToken.value) {
    // Clear the cookies
    const inviteTokenStr = inviteToken.value;
    inviteToken.value = null;
    const inviteEmailCookie = useCookie('invite-email');
    if (inviteEmailCookie.value) inviteEmailCookie.value = null;
    // Redirect if token still valid
    try {
      return await navigateTo(
        `/api/teams/verify-invite?token=${inviteTokenStr}`,
      );
    } catch {
      // Invalid token means user already verified it upon submitting registration
    }
  }

  // If teams aren't loaded yet, fetch them
  if (!teams.value.length) {
    teams.value = await useTeam().getMemberships();

    // If there are teams and we're coming from registration via invite, skip onboarding
    const fromInvite = useCookie('from-invite');
    if (fromInvite.value === 'true' && teams.value.length) {
      fromInvite.value = null;
      // User has teams from accepting invite, redirect to the team page
      return handleTeamRedirect();
    }

    if ((paramSlug || teamSlug.value) && !teams.value.length) {
      return await handleTeamRedirect();
    }
  }

  // Handle dashboard routing - allow individual dashboard or redirect to teams
  if (to.fullPath === '/dashboard' || to.fullPath === '/dashboard/') {
    // Check if user wants to use teams (has teams and came from team context)
    const useTeams =
      teams.value.length > 0 &&
      (to.query.useTeams === 'true' ||
        useCookie('prefer-teams').value === 'true');

    if (useTeams) {
      return await handleTeamRedirect();
    }
    // Allow staying on individual dashboard
    return;
  }

  // If user has teams and is on onboard route, redirect to teams
  if (teams.value.length && to.fullPath === '/dashboard/onboard') {
    return await handleTeamRedirect();
  }

  // Validate that the team in the slug belongs to the user
  if (paramSlug && !teams.value.find((team) => team.slug === paramSlug)) {
    return await handleTeamRedirect();
  } else if (paramSlug) {
    teamSlug.value = paramSlug;
  }
});
