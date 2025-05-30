<script setup lang="ts">
  interface Props {
    headline: string;
    subheadline?: string;
    showSearchBar?: boolean;
    showButtons?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    headline: '',
    subheadline: undefined,
    showSearchBar: true,
    showButtons: true
  });
</script>

<template>
  <div class="py-20">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left"
      >
        <h1 class="text-3xl font-bold text-pretty lg:text-5xl">
          {{ headline }}
        </h1>

        <template v-if="subheadline">
          <p class="text-muted max-w-2xl lg:text-xl">
            {{ subheadline }}
          </p>
        </template>

        <template v-if="showSearchBar && showButtons">
          <div
            class="mt-4 flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
          >
            <div v-if="showSearchBar">
              <!-- <SearchBar /> -->
            </div>
            <template v-if="showButtons">
              <UButton
                label="Primary Button"
                class="w-full cursor-pointer rounded-none text-lg sm:w-auto"
                >Primary Button</UButton
              >
              <UButton
                variant="outline"
                class="w-full cursor-pointer rounded-none text-lg sm:w-auto"
              >
                Buying Advice
              </UButton>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
