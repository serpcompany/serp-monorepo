<script setup lang="ts">
  definePageMeta({
    middleware: ['team-owner'],
  });
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
