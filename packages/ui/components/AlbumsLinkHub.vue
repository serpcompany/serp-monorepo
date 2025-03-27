<script setup lang="ts">
  import type { ReleaseGroupIndex } from '@serp/types/types';

  defineProps({
    albums: {
      type: Array as () => ReleaseGroupIndex[],
      required: true
    }
  });
</script>

<template>
  <div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-2">
    <div v-for="album in albums" :key="album.slug">
      <NuxtLink
        :to="`/albums/${encodeURIComponent(album.slug)}/`"
        aria-label="album name"
      >
        {{ album.name }} -
        <span v-for="artist in album.artists" :key="artist.slug">
          {{ artist.credit_name }}
          <span v-if="artist.join_phrase">{{ artist.join_phrase }}</span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
