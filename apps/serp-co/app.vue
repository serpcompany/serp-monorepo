<template>
  <u-app>
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </u-app>
</template>

<script setup>
const config = useRuntimeConfig();
const url = config.public.siteUrl;

useSeoMeta({
  ogImage: `${url}/og-image.png`
});
</script>
