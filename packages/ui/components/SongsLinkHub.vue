<script setup lang="ts">
  import type { RecordingIndex } from '@serp/types/types'

  defineProps({
    songs: {
      type: Array as () => RecordingIndex[],
      required: true,
    },
  })
</script>

<template>
  <div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-2">
    <div v-for="song in songs" :key="song.slug">
      <NuxtLink
        :to="`/songs/${encodeURIComponent(song.slug)}/`"
        aria-label="song name"
      >
        <span>{{ song.name }} - {{ song.artistCreditName }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
