<script lang="ts" setup></script>

<template>
  <div>
    <AppSidebarContent class="mt-2">
      <AppSidebarGroup>
        <AppSidebarLink
          to="/dashboard"
          icon="i-lucide-chevron-left"
          label="Dashboard"
        />
        <AppSidebarLink
          to="/dashboard/account-settings"
          icon="i-lucide-user"
          label="Account"
        />
        <AppSidebarLink
          to="/dashboard/account-security"
          icon="i-lucide-lock"
          label="Security"
        />
      </AppSidebarGroup>
    </AppSidebarContent>
  </div>
</template>
