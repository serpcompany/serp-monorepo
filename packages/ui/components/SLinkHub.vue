<script setup lang="ts">
  import type { Category } from '@serp/types/types';

  interface Props {
    categories: Category[];
    headline?: string;
    baseSlug?: string;
  }

  defineProps<Props>();
</script>

<template>
  <UPageSection
    :ui="{ title: 'text-left' }"
    :title="headline"
    orientation="vertical"
  >
    <template v-if="categories.length">
      <div
        class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <template v-for="category in categories" :key="category.slug">
          <ULink
            v-if="category.slug"
            :to="`/${baseSlug}/${category.slug}/`"
            class="group flex items-center gap-3 text-base font-medium transition-all"
            active-class="text-secondary"
          >
            <UIcon
              name="lucide:arrow-right"
              class="text-dimmed size-4 transition-all group-hover:translate-x-1"
            />
            <span>
              {{ category.name }}
            </span>
            <hr class="min-w-2 flex-1 border-(--ui-border)" />
          </ULink>
        </template>
      </div>
    </template>
    <template v-else>
      <UAlert
        variant="outline"
        color="neutral"
        description="No items listed."
      />
    </template>
  </UPageSection>
</template>
