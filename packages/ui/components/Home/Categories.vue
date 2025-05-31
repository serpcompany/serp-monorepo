<script setup lang="ts">
  const categories = await useCompanyCategories();
</script>

<template>
  <SLinkHub
    v-if="categories.length"
    :categories="categories"
    headline="Categories"
    base-slug="products/best"
  />
</template>
