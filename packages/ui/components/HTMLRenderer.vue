<script setup lang="ts">
defineProps<{ value: string }>()
</script>

<template>
  <div v-html="value" />
</template>
