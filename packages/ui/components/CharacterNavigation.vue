<script setup lang="ts">
interface Props {
  characters: string[]
  filteredCharacters: string[]
}

defineProps<Props>()
</script>

<template>
  <nav class="flex w-full flex-wrap gap-1 md:justify-between">
    <UButton
      v-for="character in characters"
      :key="character"
      :disabled="!filteredCharacters.includes(character)"
      :label="character"
      :to="`#${character}`"
      color="neutral"
      variant="outline"
      class="size-8 items-center justify-center aria-disabled:opacity-50"
    />
  </nav>
</template>
