<script setup lang="ts">
  defineProps({
    name: {
      type: String,
      required: true
    },
    oneLiner: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    },
    sections: {
      type: Array as () => string[],
      required: true
    },
    serplyLink: {
      type: String,
      required: true
    }
  });

  const header = ref(null);
  const isScrolled = ref(false);
</script>

<template>
  <div>
    <header
      ref="header"
      class="bg-[var(--ui-bg)]"
      :class="{
        'py-2': isScrolled,
        'py-2 sm:py-2': !isScrolled,
        'fixed top-0 left-0 z-50 w-full': isScrolled
      }"
    >
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <!-- header top -->

        <div class="flex flex-col items-center justify-between sm:flex-row">
          <!-- image -->
          <div class="flex w-full items-start justify-between">
            <NuxtImg
              v-if="image"
              :src="image"
              :alt="`${name} logo`"
              class="mr-2 object-contain transition-all duration-300"
              :class="{ 'h-10': isScrolled, 'h-16': !isScrolled }"
            />

            <!-- name -->
            <div class="flex-grow" :class="{ 'hidden sm:block': isScrolled }">
              <h1
                class="text-xl font-bold text-(--ui-primary) transition-all duration-300 sm:text-3xl"
                :class="{
                  'text-xl sm:text-lg': isScrolled,
                  'mt-0': isScrolled
                }"
              >
                {{ name }}
              </h1>
              <span class="text-xs">{{ oneLiner }}</span>
            </div>
          </div>

          <!-- action buttons -->
          <div
            class="flex w-full flex-col items-center justify-end gap-3 pt-4 sm:flex-row sm:pt-0"
          >
            <!-- upvote button slot -->
            <slot name="upvote"></slot>

            <!-- visit website button -->
            <NuxtLink
              :href="serplyLink"
              target="_blank"
              class="flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-neutral-800 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Listen Free
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
          </div>
        </div>

        <!-- header bottom (nav links) -->
        <div
          class="-mx-4 mt-4 overflow-x-auto px-4 sm:px-0"
          :class="{ 'mt-2': isScrolled }"
        >
          <nav
            aria-label="page sections"
            class="flex space-x-4 border-t border-b whitespace-nowrap"
          >
            <NuxtLink
              v-for="section in sections"
              :key="section"
              :href="'#' + section.toLowerCase()"
              class="sectionLinks text-muted-foreground flex-shrink-0 px-1 py-2 text-sm transition-colors duration-200 hover:text-(--ui-primary) sm:px-2 sm:text-base"
            >
              {{ section }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>
