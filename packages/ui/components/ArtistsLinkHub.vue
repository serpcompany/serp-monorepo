<template>
  <div
    class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <div v-for="artist in artists" :key="artist.slug">
      <span>
        <NuxtLink :to="`/artists/${artist.slug}/`" aria-label="artist name">
          {{ artist.name }}
        </NuxtLink>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArtistBase } from '@serp/types/types';

const props = defineProps({
  artists: {
    type: Array as () => ArtistBase[],
    required: true
  }
});
</script>
