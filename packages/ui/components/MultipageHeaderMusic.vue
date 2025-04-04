<script setup lang="ts">
  defineProps({
    name: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    },
    image: {
      type: String,
      required: false,
      default: ''
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

  const header = ref<HTMLElement | null>(null);
  const isScrolled = ref(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      isScrolled.value = true;
    } else {
      isScrolled.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<template>
  <header
    ref="header"
    class="bg-background sticky top-0 z-40 border-b border-gray-200 transition-all duration-300 dark:border-gray-800"
  >
    <UContainer>
      <div
        class="flex flex-col items-center justify-between gap-4 py-3 sm:flex-row"
      >
        <div class="flex min-w-0 flex-grow items-center gap-3">
          <NuxtImg
            v-if="image"
            :src="image"
            :alt="`${name} logo`"
            class="flex-shrink-0 object-contain transition-all duration-300"
            :class="isScrolled ? 'h-8 w-8' : 'h-12 w-12'"
          />
          <div class="min-w-0 flex-grow">
            <h1
              class="truncate text-xl font-bold text-gray-900 transition-all duration-300 sm:text-2xl dark:text-white"
            >
              {{ name }}
            </h1>
            <div class="truncate text-sm text-gray-500 dark:text-gray-400">
              <slot name="subtitle"></slot>
            </div>
          </div>
        </div>

        <div
          class="flex w-full flex-shrink-0 items-center justify-end gap-3 sm:w-auto"
        >
          <slot name="upvote"></slot>

          <UButton
            :to="serplyLink"
            target="_blank"
            label="Listen Free"
            icon="i-heroicons-arrow-top-right-on-square"
            color="black"
            size="sm"
            class="w-full sm:w-auto"
          />
        </div>
      </div>

      <nav
        class="-mx-4 flex overflow-x-auto border-t border-gray-200 px-4 sm:-mx-6 sm:px-6 dark:border-gray-800"
      >
        <UButton
          v-for="section in sections"
          :key="section"
          :to="'#' + section.toLowerCase()"
          :label="section"
          variant="ghost"
          color="gray"
          size="sm"
          class="flex-shrink-0 rounded-none whitespace-nowrap"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'px-4 py-2' } }"
        />
      </nav>
    </UContainer>
  </header>
</template>
