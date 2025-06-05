<script lang="ts" setup>
  const teams = useState<unknown[]>('teams', () => [])

  // Fetch teams if not already loaded to show switch option
  if (!teams.value.length) {
    try {
      teams.value = await useTeam().getMemberships()
    }
    catch {
      // User might not have teams or there might be an error
      teams.value = []
    }
  }
</script>

<template>
  <div>
    <AppSidebarContent class="mt-2">
      <AppSidebarGroup>
        <AppSidebarLink
          to="/dashboard"
          icon="i-lucide-home"
          label="Dashboard"
        />
        <AppSidebarLink
          to="/dashboard/billing"
          icon="i-lucide-credit-card"
          label="Billing"
        />
        <USeparator class="my-4" />
        <AppSidebarLink
          to="/dashboard/account-settings"
          icon="i-lucide-user"
          label="Account Settings"
        />
        <AppSidebarLink
          to="/dashboard/account-security"
          icon="i-lucide-lock"
          label="Security"
        />
        <template v-if="teams?.length > 0">
          <USeparator class="my-4" />
          <AppSidebarLink
            to="/dashboard?useTeams=true"
            icon="i-lucide-users"
            label="Switch to Teams"
          />
        </template>
      </AppSidebarGroup>
    </AppSidebarContent>
  </div>
</template>
