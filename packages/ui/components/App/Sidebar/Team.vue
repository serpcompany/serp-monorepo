<script lang="ts" setup>
import { useTeam } from '@serp/auth/composables/useTeam'

const { isTeamOwner, currentTeam } = useTeam()

const links = computed(() => [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: `/dashboard/${currentTeam.value.slug}`,
  },
  {
    label: 'Posts',
    icon: 'i-lucide-file-text',
    to: `/dashboard/${currentTeam.value.slug}/posts`,
  },
])

const settings = computed(() => [
  {
    label: 'Workspace Settings',
    icon: 'i-lucide-settings',
    to: `/dashboard/${currentTeam.value.slug}/settings`,
  },
  {
    label: 'Workspace Members',
    icon: 'i-lucide-users',
    to: `/dashboard/${currentTeam.value.slug}/settings/members`,
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: `/dashboard/${currentTeam.value.slug}/settings/billing`,
  },
])
</script>

<template>
  <header>
    <AppTeamDropdown />
  </header>
  <AppSidebarContent class="mt-2">
    <AppSidebarGroup>
      <AppSidebarLink v-for="link in links" :key="link.to" v-bind="link" />
      <template v-if="isTeamOwner">
        <USeparator class="my-4" />
        <AppSidebarLink v-for="link in settings" :key="link.to" v-bind="link" />
      </template>
    </AppSidebarGroup>
  </AppSidebarContent>
</template>
