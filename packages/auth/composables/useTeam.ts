import type { Team } from '@serp/db/types/database'
import type { FetchError } from 'ofetch'
import { z } from 'zod'

export function useTeam() {
  const { user } = useUserSession()
  const toast = useToast()
  const teamSchema = z.object({
    name: z.string().min(1, 'Team name is required'),
    logo: z.string().optional(),
    slug: z
      .string()
      .min(1, 'Team slug is required')
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Only lowercase letters, numbers, and single hyphens between characters allowed',
      ),
  })

  const router = useRouter()
  const teamSlug = computed(
    () => router.currentRoute.value.params.team as string,
  )

  const loading = ref(false)
  const teams = useState<Team[]>('teams', () => [])

  const currentTeam = computed(() => {
    if (!teamSlug.value || !teams.value.length) {
      return teams.value[0] || ({} as Team)
    }

    const team = teams.value.find(team => team.slug === teamSlug.value)
    if (!team) {
      throw createError('Team not found')
    }
    return team
  })

  const isTeamOwner = ref(false)
  watch(
    currentTeam,
    (team) => {
      isTeamOwner.value = team.ownerId === user.value?.id
    },
    { immediate: true },
  )

  const getMemberships = async () => {
    loading.value = true
    try {
      const { data: memberships } = await useFetch<Team[]>(
        '/api/me/memberships',
      )
      return memberships.value!
    }
    finally {
      loading.value = false
    }
  }

  const createTeam = async (teamData: z.infer<typeof teamSchema>) => {
    loading.value = true
    try {
      const newTeam = await $fetch<Team>('/api/teams', {
        method: 'POST',
        body: teamData,
      })
      toast.add({
        title: 'Team created successfully',
        color: 'success',
      })
      return newTeam
    }
    catch (error) {
      toast.add({
        title: 'Failed to create team',
        description: (error as FetchError).statusMessage,
        color: 'error',
      })
      throw error
    }
    finally {
      loading.value = false
    }
  }

  const updateTeam = async (
    teamId: string,
    teamData: Partial<z.infer<typeof teamSchema>>,
  ) => {
    loading.value = true
    try {
      const updatedTeam = await $fetch<Team>(`/api/teams/${teamId}`, {
        method: 'PATCH',
        body: teamData,
      })
      teams.value = teams.value.map(team =>
        team.id === teamId ? updatedTeam : team,
      )
      toast.add({
        title: 'Team updated successfully',
        color: 'success',
      })
      return updatedTeam
    }
    finally {
      loading.value = false
    }
  }

  const deleteTeam = async (teamId: string) => {
    loading.value = true
    try {
      await $fetch(`/api/teams/${teamId}`, { method: 'DELETE' })
      teams.value = teams.value.filter(team => team.id !== teamId)
      toast.add({
        title: 'Team deleted successfully',
        color: 'success',
      })
    }
    finally {
      loading.value = false
    }
  }

  const inviteMember = async (email: string, role = 'member') => {
    loading.value = true
    try {
      return await $fetch(`/api/teams/${currentTeam.value.id}/members`, {
        method: 'POST',
        body: { email, role },
      })
    }
    finally {
      loading.value = false
    }
  }

  const cancelInvite = async (inviteId: string) => {
    loading.value = true
    try {
      return await $fetch(
        `/api/teams/${currentTeam.value.id}/invites/${inviteId}`,
        {
          method: 'DELETE',
        },
      )
    }
    finally {
      loading.value = false
    }
  }

  const resendInvite = async (inviteId: string) => {
    loading.value = true
    try {
      await $fetch(
        `/api/teams/${currentTeam.value.id}/invites/${inviteId}/resend`,
        {
          method: 'POST',
        },
      )
    }
    finally {
      loading.value = false
    }
  }

  const removeTeamMember = async (memberId: string) => {
    loading.value = true
    try {
      if (!currentTeam.value.id)
        return

      await $fetch(`/api/teams/${currentTeam.value.id}/members/${memberId}`, {
        method: 'DELETE',
      })
      toast.add({
        title: 'Team member removed successfully',
        color: 'success',
      })
    }
    catch (error) {
      toast.add({
        title: 'Failed to remove team member',
        description: (error as FetchError).statusMessage,
        color: 'error',
      })
      throw error
    }
    finally {
      loading.value = false
    }
  }

  return {
    loading,
    getMemberships,
    createTeam,
    updateTeam,
    deleteTeam,
    inviteMember,
    cancelInvite,
    resendInvite,
    isTeamOwner,
    teamSchema,
    currentTeam,
    teams,
    removeTeamMember,
  }
}
