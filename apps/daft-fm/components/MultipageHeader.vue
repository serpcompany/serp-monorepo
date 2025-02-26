<template>
  <div>
    <header
      ref="header"
      :class="{
        'py-2': isScrolled,
        'py-4 sm:py-8': !isScrolled,
        'fixed top-0 left-0 z-50 w-full bg-[var(--ui-bg)]': isScrolled
      }"
    >
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <!-- header top -->
        <div class="flex flex-col items-center justify-between sm:flex-row">
          <div
            class="flex w-full items-center justify-between sm:justify-start"
          >
            <!-- image -->
            <!-- <img

                 :alt="`${item.name} logo`"
                 class="object-contain transition-all duration-300"
                 :class="{ 'h-10': isScrolled, 'h-16': !isScrolled }" /> -->

            <!-- info -->
            <div
              class="ml-4 flex-grow"
              :class="{ 'hidden sm:block': isScrolled }"
            >
              <h1
                class="text-primary text-2xl font-bold transition-all duration-300 sm:text-3xl"
                :class="{
                  'text-xl sm:text-lg': isScrolled,
                  'mt-0': isScrolled
                }"
              >
                {{ name }}
              </h1>
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
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  sections: {
    type: Array as () => string[],
    required: true
  }
});

const header = ref(null);
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
