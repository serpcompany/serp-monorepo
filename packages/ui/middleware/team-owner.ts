import type { Team } from '@serp/db/types/database';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const toast = useToast();
  const { loggedIn } = useUserSession();
  const teams = useState<Team[]>('teams', () => []);
  const teamSlug = useState<string>('teamSlug');
  const { isTeamOwner } = useTeam();

  // Is user logged in?
  if (!loggedIn.value) {
    if (teamSlug.value) teamSlug.value = '';
    if (teams.value.length) teams.value = [];
    return navigateTo('/auth/login');
  }

  // Get team slug from route parameter
  const currentTeam = teams.value.find(
    (team) => team.slug === (to.params.team as string)
  );

  if (!currentTeam) {
    toast.add({
      title: 'Team not found',
      color: 'error'
    });
    return navigateTo('/dashboard');
  }

  if (!isTeamOwner.value) {
    toast.add({
      title: 'Unauthorized Access',
      color: 'error'
    });
    return navigateTo('/dashboard');
  }
});
