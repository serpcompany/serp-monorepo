export function useTeamPreferences(): {
  setLastUsedTeam: (slug: string) => void;
  getLastUsedTeam: () => string | null | undefined;
} {
  const lastTeamSlug = useCookie('lastTeamSlug', {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });

  const setLastUsedTeam = (slug: string): void => {
    lastTeamSlug.value = slug;
  };

  const getLastUsedTeam = (): string | null | undefined => {
    return lastTeamSlug.value;
  };

  return {
    setLastUsedTeam,
    getLastUsedTeam,
  };
}
