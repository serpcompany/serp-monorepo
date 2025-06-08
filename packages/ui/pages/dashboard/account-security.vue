<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  })
</script>

<template>
  <AppContainer title="Account Security">
    <div class="flex flex-col mx-auto w-full gap-6 sm:gap-12 lg:max-w-2xl">
      <DashboardAccountSecurityPassword />
      <ClientOnly>
        <DashboardAccountSecurityPasskey />
      </ClientOnly>
    </div>
  </AppContainer>
</template>
