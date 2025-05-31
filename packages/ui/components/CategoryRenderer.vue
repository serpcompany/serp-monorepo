<script setup lang="ts">
  defineProps<{
    value: unknown;
    baseSlug: string;
  }>();
</script>

<template>
  <SPill :items="value" :base-slug="baseSlug" />
</template>
