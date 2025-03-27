<script setup lang="ts">
  defineProps<{
    title: string;
    subtitle?: string;
  }>();
</script>

<template>
  <section class="py-20">
    <h1 class="md:text-center">{{ title }}</h1>
    <p
      v-if="subtitle"
      data-testid="subtitle"
      class="sm:text-md text-left text-base md:text-center"
    >
      {{ subtitle }}
    </p>
  </section>
</template>
