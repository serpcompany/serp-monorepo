<template>
  <div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-2">
    <div v-for="song in songs" :key="song.slug">
      <nuxt-link :to="`/songs/${song.slug}/`" aria-label="song name">
        {{ song.name }} -
        <span v-for="artist in song.artists" :key="artist.slug">
          {{ artist.credit_name }}
          <span v-if="artist.join_phrase">{{ artist.join_phrase }}</span>
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecordingIndex } from '@serp/types/types';

defineProps({
  songs: {
    type: Array as () => RecordingIndex[],
    required: true
  }
});
</script>
