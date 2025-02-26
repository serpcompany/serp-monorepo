<template>
  <div class="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-2">
    <div v-for="album in albums" :key="album.slug">
      <nuxt-link :to="`/albums/${album.slug}/`" aria-label="album name">
        {{ album.name }} -
        <span v-for="artist in album.artists" :key="artist.slug">
          {{ artist.creditName }}
          <span v-if="artist.joinPhrase">{{ artist.joinPhrase }}</span>
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ReleaseGroupIndex } from '@serp/types/types'

defineProps({
  albums: {
    type: Array as () => ReleaseGroupIndex[],
    required: true
  }
})
</script>
