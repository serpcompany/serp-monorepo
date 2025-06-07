<script lang="ts" setup>
  import type { User } from '@serp/db/types/database'

  interface TeamMember {
    id: string
    teamId: string
    userId: string
    role: string
    createdAt: string
    updatedAt: string
    team: {
      id: string
      name: string
      ownerId: string
      logo: string
      slug: string
      createdAt: string
      updatedAt: string
    }
  }

  const props = defineProps<{
    teamMembers?: TeamMember[]
    users?: User[]
  }>()

  function getTeamOwner(ownerId: string): {
    name: string
    email: string
    avatarUrl: string
  } {
    if (!ownerId || !props.users?.length)
      return { name: 'Unknown', email: 'Unknown', avatarUrl: 'Unknown' }
    const owner = props.users.find(user => user.id === ownerId)
    return {
      name: owner?.name || 'Unknown',
      email: owner?.email || 'Unknown',
      avatarUrl: owner?.avatarUrl || 'Unknown',
    }
  }
</script>

<template>
  <UPopover v-if="teamMembers?.length" mode="hover">
    <div class="flex cursor-pointer items-center gap-1">
      <span>{{ teamMembers.length }}</span>
      <UIcon name="i-lucide-users" class="text-neutral-500" />
    </div>
    <template #content>
      <div class="w-72 px-4 py-2">
        <ul class="divide-y divide-neutral-100 dark:divide-white/10">
          <li
            v-for="teamMember in teamMembers"
            :key="teamMember.id"
            class="py-2"
          >
            <div class="flex items-center gap-2">
              <UAvatar
                :src="teamMember.team.logo || undefined"
                size="2xs"
                :alt="`${teamMember.team.name} logo`"
              />
              <span class="flex-1 text-sm font-medium">
                {{ teamMember.team.name }}
              </span>
              <span class="text-xs text-neutral-500 capitalize">
                {{ teamMember.role }}
              </span>
            </div>
            <div v-if="teamMember.role !== 'owner'" class="p-2 pb-0 pl-2.5">
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-fluent-arrow-enter-24-filled"
                  class="flex-shrink-0 scale-x-[-1] text-sm"
                />
                <p class="text-xs text-neutral-500">
                  Owned by
                </p>
                <UAvatar
                  :src="
                    getTeamOwner(teamMember.team.ownerId).avatarUrl || undefined
                  "
                  size="3xs"
                  :alt="getTeamOwner(teamMember.team.ownerId).name"
                />
                <p class="text-xs font-medium">
                  {{ getTeamOwner(teamMember.team.ownerId).name }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </UPopover>
  <span v-else>-</span>
</template>
