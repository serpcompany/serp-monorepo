<script lang="ts" setup>
const props = defineProps<{
  isAccountSettings: boolean
  teamSlug?: string
}>()

const accountLinks = [
  {
    label: 'Account Settings',
    icon: 'i-lucide-settings',
    to: '/dashboard/account-settings',
  },
]

const teamNavLinks = computed(() => [
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: `/dashboard/${props.teamSlug}`,
  },
  {
    label: 'Posts',
    icon: 'i-lucide-file-text',
    to: `/dashboard/${props.teamSlug}/posts`,
  },
])

const teamSettingsLinks = computed(() => [
  {
    label: 'Workspace Settings',
    icon: 'i-lucide-settings',
    to: `/dashboard/${props.teamSlug}/settings`,
  },
  {
    label: 'Workspace Members',
    icon: 'i-lucide-users',
    to: `/dashboard/${props.teamSlug}/settings/members`,
  },
  {
    label: 'Billing',
    icon: 'i-lucide-credit-card',
    to: `/dashboard/${props.teamSlug}/settings/billing`,
  },
])
</script>

<template>
  <ul class="space-y-1">
    <template v-if="isAccountSettings">
      <li v-for="link in accountLinks" :key="link.to">
        <AppSidebarLink v-bind="link" />
      </li>
    </template>
    <template v-else>
      <li v-for="link in teamNavLinks" :key="link.to">
        <AppSidebarLink v-bind="link" />
      </li>
      <USeparator class="my-4" />
      <li v-for="link in teamSettingsLinks" :key="link.to">
        <AppSidebarLink v-bind="link" />
      </li>
    </template>
  </ul>
</template>
