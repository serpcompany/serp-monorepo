<script setup lang="ts">
  defineProps<{ value; baseSlug }>();
</script>

<template>
  <SPill :items="value" :base-slug="baseSlug" />
</template>
