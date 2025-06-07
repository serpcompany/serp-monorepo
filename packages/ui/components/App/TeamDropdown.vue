<script lang="ts" setup>
  import type { Team } from '@serp/db/types/database'

  const newTeamModal = ref(false)
  const { currentTeam } = useTeam()
  const teams = useState<Team[]>('teams')
  const { setLastUsedTeam } = useTeamPreferences()

  function getAvatarProps(team?: Team) {
    return {
      src: team?.logo || team?.entity?.data?.logo || undefined,
      size: 'xs' as const,
    }
  }

  async function onTeamCreated(team: Team) {
    newTeamModal.value = false
    await navigateTo(`/dashboard/${team.slug}`)
  }

  const items = computed(() => {
    if (!teams.value)
      return []

    const allTeams = teams.value.map(team => ({
      label: team.name,
      avatar: {
        src: team.logo!,
        size: '2xs' as const,
      },
      type: 'checkbox' as const,
      checked: team.slug === currentTeam.value.slug,
      onSelect: async (_e: Event) => {
        setLastUsedTeam(team.slug)
        await navigateTo(`/dashboard/${team.slug}`, { replace: true })
      },
    }))

    return [
      [...allTeams],
      [
        {
          label: 'Create a new team',
          icon: 'i-lucide-plus-circle',
          onSelect: () => {
            newTeamModal.value = true
          },
        },
      ],
    ]
  })
</script>

<template>
  <UDropdownMenu
    :items="items"
    :ui="{
      content: 'w-[240px]',
      item: 'cursor-pointer',
      itemTrailingIcon: 'size-4',
    }"
  >
    <UButton
      :label="currentTeam?.name"
      :avatar="getAvatarProps(currentTeam)"
      color="neutral"
      variant="ghost"
      class="w-full hover:bg-neutral-200/80 dark:hover:bg-white/10"
      block
      trailing-icon="i-lucide-chevrons-up-down"
      :ui="{ trailingIcon: 'size-4' }"
    />
  </UDropdownMenu>
  <UDrawer
    v-model:open="newTeamModal"
    :ui="{ container: 'max-w-xl mx-auto' }"
    title="Create a new team"
    description="A team is a workspace for your organization."
  >
    <template #body>
      <AppNewTeamForm @success="onTeamCreated" />
    </template>
  </UDrawer>
</template>
