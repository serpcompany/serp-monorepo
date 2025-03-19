<template>
  <client-only>
    <u-button
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="ghost"
      aria-label="Toggle color mode"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <div class="size-8"></div>
    </template>
  </client-only>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports';

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
});
</script>
