<script setup lang="ts">
  definePageMeta({
    middleware: ['auth']
  });

  const { user } = useUserSession();
  const route = useRoute();
  const isOnboardRoute = computed(() =>
    route.path.startsWith('/dashboard/onboard')
  );
</script>

<template>
  <main class="fixed inset-0 flex overflow-hidden">
    <AppSidebar v-if="!isOnboardRoute" />
    <div class="w-full min-w-0 flex-1 overflow-y-auto">
      <SuperAdminImpersonationBanner v-if="user?._impersonated" :user="user" />
      <NuxtPage />
    </div>
  </main>
</template>
