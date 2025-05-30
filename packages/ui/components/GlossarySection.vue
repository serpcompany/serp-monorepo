<script setup lang="ts">
  interface Props {
    id: string;
    title: string;
    items: Array<{
      keyword?: string;
      title?: string;
      slug: string;
      name: string;
    }>;
  }

  defineProps<Props>();
</script>

<template>
  <UPageSection
    :id="id"
    :title="title"
    :ui="{
      title: 'text-left',
      container: 'px-0 lg:px-0'
    }"
    orientation="vertical"
  >
    <div
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-8 lg:grid-cols-3"
    >
      <ULink
        v-for="item in items"
        :key="item.slug"
        :to="`/posts/${item.slug}/`"
        class="group flex items-center gap-3"
      >
        <UIcon
          name="lucide:arrow-right"
          class="text-dimmed size-4 transition-transform group-hover:translate-x-1"
        />
        <span class="truncate text-base font-medium">
          {{ item.keyword || item.title || item.name }}
        </span>
        <hr class="min-w-0 flex-1 border-(--ui-border)" />
      </ULink>
    </div>
  </UPageSection>
</template>
