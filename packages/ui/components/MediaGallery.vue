<template>
  <section class="flex w-full flex-col gap-2 md:max-w-[444px]">
    <div class="aspect-video">
      <div
        class="relative flex h-full w-full cursor-pointer items-center justify-center"
      >
        <LazyNuxtImg
          v-if="company?.screenshots && company.screenshots.length"
          :src="company?.screenshots[0]"
          alt="Main Image"
          class="h-full w-full cursor-pointer object-cover"
        />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-2">
      <div v-for="screenshot in company?.screenshots" :key="screenshot">
        <div class="flex h-full w-full items-center justify-center">
          <NuxtImg
            :src="screenshot"
            :alt="`${company.name} screenshots`"
            class="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Company } from '@serp/types/types';

defineProps<{
  company: Company;
}>();
</script>
