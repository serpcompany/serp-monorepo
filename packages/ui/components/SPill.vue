<script setup lang="ts">
  import type { Category } from '@serp/types/types'

  defineProps<{
    items: Category[]
    baseSlug: string
  }>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <NuxtLink
      v-for="item in items"
      :key="item.id"
      :to="`/${baseSlug}/${item.slug}/`"
      class="rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50"
    >
      {{ item.name }}
    </NuxtLink>
  </div>
</template>
