<script lang="ts" setup>
  definePageMeta({
    middleware: ['super-admin']
  });
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
