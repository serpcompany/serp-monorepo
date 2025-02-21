<!-- layouts/default.vue -->
<template>
  <div class="container mx-auto">
    <s-header />
    <u-breadcrumb class="mt-10 mb-4" :items="items" />
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
