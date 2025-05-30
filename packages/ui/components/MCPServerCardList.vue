<script setup lang="ts">
  import type { MCPServer } from '@serp/types/types';

  interface Props {
    items: MCPServer[];
    paginationTotal?: number;
    paginationLimit?: number;
    loading?: boolean;
  }

  defineProps<Props>();

  const page = defineModel<number>('page', {
    default: 1
  });
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <template v-if="loading">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SkeletonMCPServerCard />
        <SkeletonMCPServerCard />
      </div>
    </template>
    <template v-else-if="items.length">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MCPServerCard
          v-for="server in items"
          :key="server.slug"
          :server="server"
        />
      </div>
      <div class="flex justify-center">
        <UPagination
          v-model:page="page"
          :total="paginationTotal"
          :items-per-page="paginationLimit"
          :sibling-count="3"
          aria-label="pagination"
        />
      </div>
    </template>
    <template v-else>
      <UAlert
        variant="outline"
        color="neutral"
        description="No items found for the given filters."
      />
    </template>
  </div>
</template>
