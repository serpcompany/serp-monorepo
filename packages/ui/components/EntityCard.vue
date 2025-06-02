<script setup lang="ts">
import type { Entity } from '@serp/types/types'

const props = defineProps({
  entity: {
    type: Object as PropType<Company>,
    required: true,
  },
  baseSlug: {
    type: String,
    required: true,
  },
  baseCategorySlug: {
    type: String,
    required: true,
  },
})

// Compute the main image, either the entity logo or the first screenshot
const entityMainImage = computed(() => {
  if (props.entity.image) {
    return props.entity.image
  }
  else if (props.entity.logo) {
    return props.entity.logo
  }
  else if (props.entity.screenshots && props.entity.screenshots.length) {
    return props.entity.screenshots[0]
  }
  else {
    return null
  }
})
</script>

<template>
  <div
    class="mx-auto max-w-5xl rounded-lg" :class="[
      entity.featured
        ? 'relative overflow-hidden border border-neutral-200 bg-gradient-to-b from-blue-50/50 to-transparent px-6 py-10 dark:border-blue-500/40 dark:from-blue-900/30 dark:to-neutral-900/60 dark:shadow-[0_0_15px_rgba(30,64,175,0.15)]'
        : 'border border-[var(--ui-border)] px-5 py-4 dark:border-[var(--ui-border-accented)]',
    ]"
  >
    <!-- Featured accent border -->
    <div
      v-if="entity.featured"
      class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"
      aria-hidden="true"
    />

    <!-- card content -->
    <div class="flex items-start">
      <!-- entity image -->
      <div
        v-if="entityMainImage"
        class="mr-5 flex-shrink-0"
        :class="{ 'mb-4 sm:mb-0': entity.featured }"
      >
        <NuxtLink :to="`/${baseSlug}${entity.slug}/reviews/`">
          <div
            class="overflow-hidden rounded-lg bg-[var(--ui-bg-muted)] dark:bg-[var(--ui-bg-elevated)]" :class="[
              entity.featured
                ? 'h-36 w-36 ring-1 ring-blue-100 dark:ring-blue-500/50'
                : 'h-28 w-28',
            ]"
          >
            <LazyNuxtImg
              :src="entityMainImage"
              :alt="entity.name"
              class="h-full w-full object-contain"
            />
          </div>
        </NuxtLink>
      </div>

      <!-- entity content -->
      <div class="flex-grow">
        <div class="flex flex-col justify-between sm:flex-row">
          <div class="sm:max-w-[calc(100%-180px)] sm:pr-8">
            <!-- entity name and badge -->
            <div class="flex items-center">
              <NuxtLink class="flex" :to="`/${baseSlug}${entity.slug}/`">
                <h2
                  class="font-semibold" :class="[
                    entity.featured
                      ? 'mb-1 text-2xl text-blue-700 dark:text-blue-300'
                      : 'text-xl text-[var(--ui-text)] dark:text-[var(--ui-text)]',
                  ]"
                >
                  {{ entity.name }}
                </h2>
              </NuxtLink>
              <UBadge
                v-if="entity.featured"
                :avatar="{
                  src: 'https://github.com/serpentity.png',
                }"
                size="md"
                color="info"
                variant="filled"
                class="ml-4"
              >
                Featured
              </UBadge>
            </div>

            <!-- entity oneliner -->
            <p
              class="text-[var(--ui-text-muted)] dark:text-[var(--ui-text-toned)]" :class="[
                entity.featured
                  ? 'mt-3 text-base leading-relaxed dark:text-[var(--ui-text)]'
                  : 'mt-2 line-clamp-2',
              ]"
            >
              {{ entity.oneLiner || entity.excerpt }}
            </p>

            <!-- show excerpt only for featured cards -->
            <p
              v-if="entity.featured && entity.oneLiner && entity.excerpt"
              class="mt-5 mb-1 line-clamp-3 text-[var(--ui-text-muted)] dark:text-[var(--ui-text-toned)]"
            >
              {{ entity.excerpt }}
            </p>

            <!-- rating display -->
            <div
              v-if="entity.rating"
              :class="{ 'mt-3': !entity.featured, 'mt-6': entity.featured }"
            >
              <span class="text-lg font-medium">{{ entity.rating }}/5</span>
            </div>
          </div>

          <!-- right side buttons -->
          <div
            class="flex min-w-[140px] flex-col space-y-2" :class="[
              entity.featured ? 'mt-5 sm:mt-0 sm:ml-4' : 'mt-4 sm:mt-0',
            ]"
          >
            <!-- view website button -->
            <NuxtLink
              v-if="entity.serplyLink"
              :href="entity.serplyLink"
              target="_blank"
              class="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[var(--ui-bg-inverted)] px-4 py-2 text-sm font-medium text-[var(--ui-bg)] transition-colors hover:bg-neutral-800 dark:bg-[var(--ui-bg)] dark:text-[var(--ui-bg-inverted)] dark:hover:bg-[var(--ui-bg-elevated)]"
            >
              Website
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </NuxtLink>

            <!-- upvote button -->
            <VoteButton
              :id="entity.id"
              module="entity"
              :users-current-vote="entity.usersCurrentVote"
              :upvotes="entity.numUpvotes"
              :downvotes="entity.numDownvotes"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- feature tags only for featured entities -->
    <div
      v-if="entity.featured && entity.features && entity.features.length"
      class="mt-8"
    >
      <div class="flex flex-wrap gap-2">
        <span
          v-for="feature in entity.features.slice(0, 4)"
          :key="feature.id"
          class="inline-flex rounded-full bg-[var(--ui-color-secondary-50)] px-3 py-1 text-xs font-medium text-[var(--ui-color-secondary-700)] dark:bg-[var(--ui-color-secondary-900)]/30 dark:text-[var(--ui-color-secondary-200)]"
        >
          {{ feature.item }}
        </span>
      </div>
    </div>

    <SPill
      v-if="entity.categories && entity.categories.length"
      :items="entity.categories"
      :base-slug="baseCategorySlug"
    />
  </div>
</template>

<style scoped>
  .upvote-btn :deep(button) {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  width: 100%;
}
.upvote-btn :deep(.flex) {
  width: 100%;
}

/* Override orange upvote color with blue */
.upvote-btn :deep(.text-orange-500) {
  color: var(--ui-color-secondary-500, #0969da) !important;
}
.upvote-btn :deep(.dark\:text-orange-400) {
  color: var(--ui-color-secondary-400, #2f81f7) !important;
}
</style>
