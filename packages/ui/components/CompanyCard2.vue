<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: 'Continue'
    },
    url: {
      type: String,
      default: 'https://continue.dev'
    },
    badge: {
      type: String,
      default: 'Free'
    },
    badgeColor: {
      type: String,
      default: 'success'
    },
    rating: {
      type: Number,
      default: 0
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    badges: {
      type: Array,
      default: () => ['JetBrains Plugin', 'VS Code Extension']
    },
    description: {
      type: String,
      default:
        'Continue is the leading open-source AI code assistant. You can connect any models and any context to build custom autocomplete and chat experiences inside VS Code and JetBrains.'
    }
  });

  defineEmits(['upvote', 'bookmark', 'read-more']);
</script>

<template>
  <UCard
    class="mx-auto flex h-full max-w-4xl flex-col"
    variant="outline"
    :ui="{
      root: 'rounded-sm min-h-[320px]',
      header: 'p-2 sm:px-6',
      body: 'p-2 sm:p-6 flex-grow',
      footer: 'p-2 sm:px-6'
    }"
  >
    <!-- Header with logo, title and rating -->
    <template #header>
      <div class="flex items-center justify-between">
        <!-- Logo and title section -->
        <div class="flex items-center gap-4">
          <!-- Logo -->
          <div class="rounded-lg p-2">
            <div class="flex h-12 w-12 items-center justify-center">
              <!-- Logo placeholder -->
              <svg class="h-full w-full" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2L2 8.5L2 15.5L12 22L22 15.5V8.5L12 2Z"
                />
                <path
                  fill="currentColor"
                  d="M12 5L5 9.5V14.5L12 19L19 14.5V9.5L12 5Z"
                  fill-opacity="0.3"
                />
              </svg>
            </div>
          </div>

          <!-- Title and tag -->
          <div>
            <div class="flex items-center gap-2">
              <h2 class="flex items-center gap-1 text-2xl font-bold">
                <NuxtLink :to="url" target="_blank" class="hover:text-primary">
                  {{ title }}
                  <UIcon name="i-lucide-external-link" class="ml-1 h-4 w-4" />
                </NuxtLink>
              </h2>
            </div>
          </div>
        </div>

        <!-- Rating section -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <UButton
              color="primary"
              variant="outline"
              size="sm"
              class="rounded-full p-3"
              icon="i-lucide-heart"
              @click="$emit('upvote')"
            />
          </div>
          <div class="flex items-center gap-2">
            <UButton
              color="primary"
              variant="outline"
              size="sm"
              class="rounded-full p-3"
              @click="$emit('bookmark')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
                class="fill-white stroke-gray-700 stroke-[1.5px] transition-all duration-300"
                data-sentry-element="Icon"
                data-sentry-source-file="index.tsx"
              >
                <path
                  d="M6.579 3.467c.71-1.067 2.132-1.067 2.842 0L12.975 8.8c.878 1.318.043 3.2-1.422 3.2H4.447c-1.464 0-2.3-1.882-1.422-3.2z"
                /></svg
              >Upvote
            </UButton>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div v-if="categories && categories.length" class="mt-2 flex gap-2"></div>
    </template>

    <!-- Card body with description - now with flex-grow to fill available space -->
    <div class="flex-grow">
      <p class="text-primary lg">
        {{ description }}
      </p>
    </div>

    <!-- Footer with buttons -->
    <template #footer>
      <div class="flex items-center gap-4">
        <UBadge
          v-for="(badge, index) in badges"
          :key="index"
          variant="ghost"
          icon="i-lucide-tag"
          size="sm"
          class="cursor-pointer rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50"
        >
          {{ badge }}
        </UBadge>
      </div>
    </template>
  </UCard>
</template>
