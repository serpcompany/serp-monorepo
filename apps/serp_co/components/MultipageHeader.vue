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
      <div class="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <!-- header top -->

        <div class="flex flex-col items-center justify-between sm:flex-row">
          <!-- image -->
          <div class="flex w-full items-start justify-between">
            <nuxt-img
              v-if="image"
              :src="image"
              :alt="`${name} logo`"
              class="mr-2 object-contain transition-all duration-300"
              :class="{ 'h-10': isScrolled, 'h-16': !isScrolled }"
            />

            <!-- name -->
            <div class="flex-grow" :class="{ 'hidden sm:block': isScrolled }">
              <h1
                class="text-primary text-xl font-bold transition-all duration-300 sm:text-3xl"
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

          <!-- visit website button -->
          <div class="sm:flex-end flex w-full pt-4 sm:pt-0">
            <div class="mr-auto ml-0 sm:mr-0 sm:ml-auto">
              <nuxt-link
                :to="serply_link"
                target="_blank"
                class="border px-4 py-2"
                >Visit Website</nuxt-link
              >
            </div>
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
            <nuxt-link
              v-for="section in sections"
              :key="section"
              :href="'#' + section.toLowerCase()"
              class="sectionLinks text-muted-foreground hover:text-primary flex-shrink-0 px-1 py-2 text-sm transition-colors duration-200 sm:px-2 sm:text-base"
            >
              {{ section }}
            </nuxt-link>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

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
  serply_link: {
    type: String,
    required: true
  }
});

const header = ref(null);
const isScrolled = ref(false);
</script>
