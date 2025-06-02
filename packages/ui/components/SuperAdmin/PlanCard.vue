<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="rounded-xl bg-[#fbfaf9] p-1.5 dark:bg-neutral-950">
    <div class="card-shadow rounded-md bg-white dark:bg-neutral-900">
      <header
        class="flex items-center justify-between border-b border-neutral-100 px-4 py-2 dark:border-white/10"
      >
        <p class="text-sm text-neutral-500">
          {{ title }}
        </p>
        <slot name="actions" />
      </header>
      <div class="p-4">
        <slot />
        <p v-if="description" class="text-sm text-neutral-500">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card-shadow {
  box-shadow:
    0 1px 2px #5f4a2e14,
    0 4px 6px #5f4a2e0a,
    0 24px 40px -16px #684b2514;
}
</style>
