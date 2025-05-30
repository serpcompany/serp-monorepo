<script setup lang="ts">
  import type { MCPServerIndex } from '@serp/types/types';
  import { NuxtLink } from '#components';

  interface Props {
    server: MCPServerIndex;
  }

  defineProps<Props>();
</script>

<template>
  <UCard
    :ui="{
      root: 'flex flex-col divide-dashed hover:ring-(--ui-border-accented) transition-all',
      body: 'p-5 sm:p-5 flex-grow',
      footer:
        'px-5 py-4 sm:px-5 sm:py-4 bg-gray-50 dark:bg-black/10 rounded-b-lg'
    }"
  >
    <div class="flex h-full flex-col gap-3">
      <h2 class="text-base font-semibold">
        <NuxtLink
          :to="`/mcp/servers/${server.slug}`"
          class="hover:text-secondary transition-all hover:underline"
        >
          {{ server.name }}
        </NuxtLink>
      </h2>
      <p class="text-muted line-clamp-2 text-sm">
        {{ server.excerpt }}
      </p>
      <div
        v-if="Boolean(server.categories?.length)"
        class="mt-auto flex flex-row flex-wrap items-center justify-start gap-1.5"
      >
        <template
          v-for="category in server.categories.slice(0, 3)"
          :key="category.slug"
        >
          <UBadge
            :as="NuxtLink"
            size="md"
            variant="soft"
            color="secondary"
            :to="`/mcp/servers/category/${category.slug}`"
            :label="category.name"
          />
        </template>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-row items-center gap-3">
        <UTooltip :text="`${server?.stars || 0} Stars`">
          <div class="inline-flex items-center gap-1.5">
            <UIcon name="lucide:star" class="size-4" />
            <span class="text-muted text-xs">{{ server?.stars || 0 }}</span>
          </div>
        </UTooltip>
        <UTooltip :text="`${server?.forks || 0} Forks`">
          <div class="inline-flex items-center gap-1.5">
            <UIcon name="lucide:git-fork" class="size-4" />
            <span class="text-muted text-xs">{{ server?.forks || 0 }}</span>
          </div>
        </UTooltip>
        <UButton
          :to="server.serplyLink"
          variant="ghost"
          size="xs"
          icon="lucide:external-link"
          target="_blank"
          class="ml-auto"
          external
        />
      </div>
    </template>
  </UCard>
</template>
