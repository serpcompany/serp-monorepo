<script setup lang="ts">
  const config = useRuntimeConfig();
  const url = config.public.siteUrl;

  useSeoMeta({
    ogImage: `${url}/og-image.png`
  });
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
