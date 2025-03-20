<!-- layouts/default.vue -->
<template>
  <div class="container mx-auto">
    <s-header />
    <u-breadcrumb
      v-if="route.path !== '/' && !route.path.match(/^\/[^\/]+\/?$/)"
      class="mx-auto mt-6 mb-2 max-w-7xl px-4 md:px-6 lg:px-8"
      :items="items"
      :ui="{
        link: 'text-xs font-light text-gray-800 dark:text-gray-300 min-w-0 group relative flex items-center gap-1.5 focus-visible:outline-(--ui-primary)',
        separatorIcon: 'shrink-0 size-4 text-gray-500 dark:text-gray-400'
      }"
    />
    <slot></slot>
    <lazy-s-footer />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { BreadcrumbItem } from '#ui/types';

const route = useRoute();
const items = useBreadcrumbItems({
  schemaOrg: true,
  overrides: [
    undefined,
    undefined,
    {
      label: Array.isArray(route.params.slug)
        ? route.params.slug.join('')
        : route.params.slug || '',
      to: String(route.fullPath),
      type: undefined
    }
  ]
}).value as BreadcrumbItem[];
</script>
