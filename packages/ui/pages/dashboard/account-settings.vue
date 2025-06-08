<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  })
</script>

<template>
  <AppContainer title="Account Settings">
    <div class="flex flex-col mx-auto w-full gap-6 sm:gap-12 lg:max-w-2xl">
      <DashboardAccountSettingsGeneral />
      <DashboardAccountSettingsPhoneNumber />
      <DashboardAccountSettingsLinkedAccounts />
      <DashboardAccountSettingsDangerZone />
    </div>
  </AppContainer>
</template>
