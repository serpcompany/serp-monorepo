<script setup lang="ts">
  // defineProps({
  //   title: {
  //     type: String,
  //     default: 'Continue'
  //   },
  //   url: {
  //     type: String,
  //     default: 'https://continue.dev'
  //   },
  //   badge: {
  //     type: String,
  //     default: 'Free'
  //   },
  //   badgeColor: {
  //     type: String,
  //     default: 'success'
  //   },
  //   rating: {
  //     type: Number,
  //     default: 0
  //   },
  //   reviewCount: {
  //     type: Number,
  //     default: 0
  //   },
  //   badges: {
  //     type: Array,
  //     default: () => ['JetBrains Plugin', 'VS Code Extension']
  //   },
  //   description: {
  //     type: String,
  //     default:
  //       'Continue is the leading open-source AI code assistant. You can connect any models and any context to build custom autocomplete and chat experiences inside VS Code and JetBrains.'
  //   }
  // });

  import type { MCPServerIndex } from '@serp/types/types';

  const props = defineProps({
    server: {
      type: Object as PropType<MCPServerIndex>,
      required: true
    }
  });

  // clamp description to ~3 lines
  const displayDescription = computed(() => {
    const desc = props.server.description || '';
    return desc.length > 150 ? desc.slice(0, 147) + '…' : desc;
  });
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
              <LazyNuxtImg
                :src="`https://github.com/${server.owner}.png`"
                alt="Logo"
                class="h-12 w-12 rounded-lg object-cover"
              ></LazyNuxtImg>
            </div>
          </div>

          <!-- Title and tag -->
          <div>
            <div class="flex items-center gap-2">
              <NuxtLink
                :to="`/mcp/servers/${server.slug}/`"
                class="flex items-center space-x-2"
              >
                <h2
                  class="text-xl font-semibold text-[var(--ui-text)] dark:text-[var(--ui-text)]"
                >
                  {{ server.owner }}/{{ server.repo }}
                </h2>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="flex items-center gap-4">
          <div
            v-if="server.categories && server.categories.length"
            class="flex items-center gap-2"
          >
            <UButton
              v-for="category in server.categories"
              :key="category.id"
              color="primary"
              variant="ghost"
              size="sm"
              :icon="`i-${category.icon || 'lucide-tag'}`"
              :to="`/mcp/servers/category/${category.slug}/`"
            >
            </UButton>
          </div>
        </div>
      </div>
    </template>

    <!-- Card body -->
    <div class="text-primary lg flex-grow">
      <p class="">
        {{ displayDescription }}
      </p>
    </div>

    <template #footer>
      <div
        v-if="server.topics && server.topics.length"
        class="no-scrollbar overflow-x-auto whitespace-nowrap"
      >
        <UBadge
          v-for="topic in server.topics"
          :key="topic"
          icon="i-lucide-tag"
          size="sm"
          class="mx-2 cursor-pointer rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/50"
        >
          {{ topic }}
        </UBadge>
      </div>
    </template>
  </UCard>
</template>

<style scoped>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
