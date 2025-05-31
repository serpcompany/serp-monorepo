<script setup lang="ts">
  const logos = [
    'simple-icons:adobe',
    'simple-icons:amazon',
    'simple-icons:apple',
    'simple-icons:google',
    'simple-icons:meta',
    'simple-icons:microsoft',
    'simple-icons:shopify',
    'simple-icons:slack'
  ];
</script>

<template>
  <UPageMarquee pause-on-hover>
    <template v-for="logo in logos" :key="logo">
      <UIcon :name="logo" class="text-dimmed size-8 shrink-0" />
    </template>
  </UPageMarquee>
</template>
