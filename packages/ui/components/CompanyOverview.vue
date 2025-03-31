<script setup lang="ts">
  import type { Company } from '@serp/types/types';

  defineProps<{
    company: Company;
  }>();
</script>

<template>
  <div>
    <div
      class="flex flex-col justify-between gap-6 md:flex-row md:gap-3 lg:gap-4 xl:gap-6"
    >
      <!-- Right Column: Overview and Details -->
      <section class="w-full md:flex-1">
        <p class="text-md mb-4 leading-relaxed">
          {{ company?.excerpt }}
        </p>
      </section>
    </div>
  </div>
</template>
