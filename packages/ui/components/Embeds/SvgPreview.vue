<script setup lang="ts">
  const props = defineProps({
    customizations: {
      type: Object,
      required: true,
    },
  });
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseURL || '';
</script>

<template>
  <div class="svg-preview-wrapper w-full max-w-full overflow-hidden">
    <div class="svg-preview-component" style="width: 250px; margin: 0 auto">
      <img
        :src="`${baseUrl}/api/svg/badge?category=${encodeURIComponent(customizations.categorySlug || 'Select Category')}&domain=${encodeURIComponent(customizations.productDomain || 'Select Domain')}`"
        :alt="`${customizations.categorySlug || 'Category'} Badge`"
        width="250"
        height="242"
      />
    </div>
  </div>
</template>

<style scoped>
  .svg-preview-wrapper {
    max-width: 100%;
    overflow: hidden;
  }

  .svg-preview-component {
    width: 250px;
    margin: 0 auto;
  }
</style>
