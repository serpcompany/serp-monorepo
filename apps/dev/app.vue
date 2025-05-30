<script setup lang="ts">
  const config = useRuntimeConfig();
  const url = config.public.siteUrl;

  useSeoMeta({
    ogImage: `${url}/og-image.png`
  });
</script>

<template>
  <UApp :tooltip="{ delayDuration: 0 }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
