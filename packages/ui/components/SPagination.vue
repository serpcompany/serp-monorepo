<!-- eslint-disable vue/no-mutating-props -->
<script setup lang="ts">
  withDefaults(
    defineProps<{
      totalItems: number;
      limit: number;
      siblingCount: number;
    }>(),
    {
      totalItems: 0,
      limit: 50,
      siblingCount: 3
    }
  );

  const page = defineModel<number>();
</script>

<template>
  <UPagination
    v-model:page="page"
    :total="totalItems"
    :items-per-page="limit"
    :sibling-count="siblingCount"
    aria-label="pagination"
    class="mt-20 flex justify-center overflow-x-auto rounded-none"
  />
</template>
