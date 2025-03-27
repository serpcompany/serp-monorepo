<script setup lang="ts">
  import type { Category } from '@serp/types/types';

  defineProps({
    categories: {
      type: Array as PropType<Category[]>,
      required: true
    },
    headline: {
      type: String,
      default: null
    },
    baseSlug: {
      type: String
    }
  });
</script>

<template>
  <section>
    <div class="mx-auto">
      <div class="pt-12">
        <div>
          <span class="inline-block py-4 text-3xl font-bold">{{
            headline
          }}</span>
        </div>
      </div>

      <div
        class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="category in categories"
          :key="category.slug"
          class="border-t"
        >
          <NuxtLink
            :to="`/${baseSlug}/${category.slug}/`"
            class="mt-3 flex font-medium"
          >
            {{ category.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
