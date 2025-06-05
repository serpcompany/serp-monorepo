<script setup lang="ts">
  import type { ServiceProvider } from '@serp/types/types'
  import { computed, ref } from 'vue'

  const props = defineProps({
    serviceProvider: {
      type: Object as PropType<ServiceProvider>,
      required: true,
    },
    showReadMore: {
      type: Boolean,
      default: false,
    },
    showFeatures: {
      type: Boolean,
      default: false,
    },
    showExpandedContent: {
      type: Boolean,
      default: false,
    },
    baseSlug: {
      type: String,
      default: 'service-providers/',
    },
  })
  const config = useRuntimeConfig()
  const useAuth = config.public.useAuth

  const isExpanded = ref(false)

  // Compute the main image, either the serviceProvider logo or the first screenshot
  const serviceProviderMainImage = computed(() => {
    if (props.serviceProvider.logo) {
      return props.serviceProvider.logo
    }
    else if (
      props.serviceProvider.screenshots &&
      props.serviceProvider.screenshots.length
    ) {
      return props.serviceProvider.screenshots[0]
    }
    else {
      return null
    }
  })
</script>

<template>
  <div
    class="mx-auto max-w-5xl rounded-lg"
    :class="[
      serviceProvider.featured
        ? 'relative overflow-hidden border border-neutral-200 bg-gradient-to-b from-blue-50/50 to-transparent px-6 py-10 dark:border-blue-500/40 dark:from-blue-900/30 dark:to-neutral-900/60 dark:shadow-[0_0_15px_rgba(30,64,175,0.15)]'
        : 'border border-[var(--ui-border)] px-5 py-4 dark:border-[var(--ui-border-accented)]',
    ]"
  >
    <!-- Featured accent border -->
    <div
      v-if="serviceProvider.featured"
      class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"
      aria-hidden="true"
    ></div>

    <!-- card content -->
    <div class="flex items-start">
      <!-- serviceProvider image -->
      <div
        v-if="serviceProviderMainImage"
        class="mr-5 flex-shrink-0"
        :class="{ 'mb-4 sm:mb-0': serviceProvider.featured }"
      >
        <NuxtLink :to="`/${baseSlug}${serviceProvider.slug}/`">
          <div
            class="overflow-hidden rounded-lg bg-[var(--ui-bg-muted)] dark:bg-[var(--ui-bg-elevated)]"
            :class="[
              serviceProvider.featured
                ? 'h-36 w-36 ring-1 ring-blue-100 dark:ring-blue-500/50'
                : 'h-28 w-28',
            ]"
          >
            <LazyNuxtImg
              :src="serviceProviderMainImage"
              :alt="serviceProvider.name"
              class="h-full w-full object-contain"
            />
          </div>
        </NuxtLink>
      </div>

      <!-- serviceProvider content -->
      <div class="flex-grow">
        <div class="flex flex-col justify-between sm:flex-row">
          <div class="sm:max-w-[calc(100%-180px)] sm:pr-8">
            <!-- serviceProvider name and badge -->
            <div class="flex items-center">
              <NuxtLink
                class="flex"
                :to="`/products/${serviceProvider.slug}/reviews/`"
              >
                <h2
                  class="font-semibold"
                  :class="[
                    serviceProvider.featured
                      ? 'mb-1 text-2xl text-blue-700 dark:text-blue-300'
                      : 'text-xl text-[var(--ui-text)] dark:text-[var(--ui-text)]',
                  ]"
                >
                  {{ serviceProvider.name }}
                </h2>
              </NuxtLink>
              <UBadge
                v-if="serviceProvider.featured"
                :avatar="{
                  src: 'https://github.com/serpcompany.png',
                }"
                size="md"
                color="info"
                variant="filled"
                class="ml-4"
              >
                Featured
              </UBadge>
            </div>

            <!-- serviceProvider oneliner -->
            <p
              class="text-[var(--ui-text-muted)] dark:text-[var(--ui-text-toned)]"
              :class="[
                serviceProvider.featured
                  ? 'mt-3 text-base leading-relaxed dark:text-[var(--ui-text)]'
                  : 'mt-2 line-clamp-2',
              ]"
            >
              {{ serviceProvider.excerpt }}
            </p>

            <!-- show excerpt only for featured cards -->
            <p
              v-if="serviceProvider.featured && serviceProvider.excerpt"
              class="mt-5 mb-1 line-clamp-3 text-[var(--ui-text-muted)] dark:text-[var(--ui-text-toned)]"
            >
              {{ serviceProvider.excerpt }}
            </p>

            <!-- rating display -->
            <div
              v-if="serviceProvider.rating"
              :class="{
                'mt-3': !serviceProvider.featured,
                'mt-6': serviceProvider.featured,
              }"
            >
              <span class="text-lg font-medium">
                {{ serviceProvider.rating }}/5
              </span>
            </div>
          </div>

          <!-- right side buttons -->
          <div
            class="flex min-w-[130px] flex-col space-y-2"
            :class="[
              serviceProvider.featured
                ? 'mt-5 sm:mt-0 sm:ml-4'
                : 'mt-4 sm:mt-0',
            ]"
          >
            <!-- view website button -->
            <NuxtLink
              :href="serviceProvider.serplyLink"
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
                <line
                  x1="10"
                  y1="14"
                  x2="21"
                  y2="3"
                />
              </svg>
            </NuxtLink>

            <!-- upvote button -->
            <div class="flex justify-between">
              <VoteButton
                v-if="useAuth"
                :id="serviceProvider.id"
                module="service_provider"
                :users-current-vote="serviceProvider.usersCurrentVote"
                :upvotes="serviceProvider.numUpvotes"
                :downvotes="serviceProvider.numDownvotes"
              />
              <BookmarkButton
                :id="serviceProvider.id"
                module="serviceProvider"
                :bookmarked="serviceProvider.bookmark || []"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- feature tags only for featured providers -->
    <div
      v-if="
        serviceProvider.featured &&
          serviceProvider.features &&
          serviceProvider.features.length
      "
      class="mt-8"
    >
      <div class="flex flex-wrap gap-2">
        <span
          v-for="feature in serviceProvider.features.slice(0, 4)"
          :key="feature.id"
          class="inline-flex rounded-full bg-[var(--ui-color-secondary-50)] px-3 py-1 text-xs font-medium text-[var(--ui-color-secondary-700)] dark:bg-[var(--ui-color-secondary-900)]/30 dark:text-[var(--ui-color-secondary-200)]"
        >
          {{ feature.item }}
        </span>
      </div>
    </div>

    <!-- expanded content (if needed) -->
    <div v-if="isExpanded && showExpandedContent" class="mt-8 border-t pt-4">
      <p>{{ serviceProvider.excerpt }}</p>

      <!-- features -->
      <section v-if="showFeatures" class="mt-4">
        <h3 class="pb-2 text-lg font-medium">
          Features
        </h3>
        <ul class="list-disc pl-5">
          <li v-for="feature in serviceProvider.features" :key="feature.id">
            {{ feature.item }}: {{ feature.description }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.upvote-btn :deep(button) {
  font-size: 0.875rem;
  padding: 0.5rem 1r;
  width: 100%;
}
.upvote-btn :deep(.flex) {
  width: 1%;
}
</style>
