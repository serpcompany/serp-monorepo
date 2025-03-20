<template>
  <div>
    <div class="py-20">
      <div>
        <div class="items-center">
          <div
            class="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <h1 class="my-4 text-2xl font-bold text-pretty lg:text-5xl">
              {{ headline }}
            </h1>
            <p
              v-if="subheadline"
              class="text-muted-foreground mb-8 max-w-2xl lg:text-xl"
            >
              {{ subheadline }}
            </p>
            <div
              class="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
