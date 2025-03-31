<script setup lang="ts">
  import type { Company } from '@serp/types/types';

  defineProps({
    companies: {
      type: Array as PropType<Company[]>,
      required: true
    },
    showReadMore: {
      type: Boolean,
      default: false
    },
    showProsAndCons: {
      type: Boolean,
      default: false
    },
    showFeatures: {
      type: Boolean,
      default: false
    },
    showExpandedContent: {
      type: Boolean,
      default: false
    }
  });
</script>

<template>
  <div v-for="company in companies" :key="company.id" class="mb-4 border p-4">
    <CompanyCard
      :company="company"
      :show-read-more="showReadMore"
      :show-pros-and-cons="showProsAndCons"
      :show-features="showFeatures"
      :show-expanded-content="showExpandedContent"
    />
  </div>
</template>
