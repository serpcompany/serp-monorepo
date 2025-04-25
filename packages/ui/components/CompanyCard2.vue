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

  defineEmits(['upload', 'bookmark', 'read-more']);
</script>

<template>
  <UCard
    class="mx-auto max-w-3xl"
    variant="outline"
    :ui="{
      root: 'rounded-sm',
      header: 'p-2 sm:px-6',
      body: 'p-2 sm:p-6',
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
                ></path>
                <path
                  fill="currentColor"
                  d="M12 5L5 9.5V14.5L12 19L19 14.5V9.5L12 5Z"
                  fill-opacity="0.3"
                ></path>
              </svg>
            </div>
          </div>

          <!-- Title and tag -->
          <div>
            <div class="flex items-center gap-2">
              <h2 class="flex items-center gap-1 text-2xl font-bold">
                <NuxtLink :to="url" target="_blank" class="hover:text-primary">
                  {{ title }}
                </NuxtLink>
              </h2>
              <UBadge
                v-if="badge"
                :color="badgeColor"
                class="border"
                variant="soft"
                >{{ badge }}
              </UBadge>
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
              class="rounded-lg px-4 py-2"
              icon="i-lucide-heart"
              @click="$emit('upload')"
            >
              <span class="text-xs">Likes {{ rating }}</span>
            </UButton>
          </div>
          <div class="flex items-center gap-2">
            <UButton
              color="primary"
              variant="outline"
              size="sm"
              class="rounded-lg px-4 py-2"
              icon="i-lucide-bookmark"
              @click="$emit('bookmark')"
            >
              Bookmark
            </UButton>
          </div>
        </div>
      </div>

      <!-- Cateogires -->
      <div v-if="categories && categories.length" class="mt-2 flex gap-2"></div>
    </template>

    <!-- Card body with description -->
    <div>
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
