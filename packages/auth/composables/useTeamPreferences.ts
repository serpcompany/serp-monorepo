export const useTeamPreferences = () => {
  const lastTeamSlug = useCookie('lastTeamSlug', {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/'
  });

  const setLastUsedTeam = (slug: string) => {
    lastTeamSlug.value = slug;
  };

  const getLastUsedTeam = () => {
    return lastTeamSlug.value;
  };

  return {
    setLastUsedTeam,
    getLastUsedTeam
  };
};
