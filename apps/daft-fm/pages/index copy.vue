<template>
  <div class="container py-20">
    <!-- hero -->
    <h1 class="py-30">DAFT FM</h1>

    <!-- link hub: songs -->
    <h2 class="mt-20">Songs</h2>
    <songs-link-hub :songs="songsData?.songs" />

    <!-- link hub: artists -->
    <h2 class="mt-20">Artists</h2>
    <artists-link-hub :artists="artistsData?.artists" />

    <!-- link hub: albums -->
    <h2 class="mt-20">Albums</h2>
    <albums-link-hub :albums="albumsData?.albums" />
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const { data: songsData } = await useFetch(
  `${runtimeConfig.public.apiUrl}/songs`,
  {
    lazy: true
  }
);

const { data: artistsData } = await useFetch(
  `${runtimeConfig.public.apiUrl}/artists`,
  {
    lazy: true
  }
);

const { data: albumsData } = await useFetch(
  `${runtimeConfig.public.apiUrl}/albums`,
  {
    lazy: true
  }
);

useSeoMeta({
  title: 'Home',
  description:
    'DAFT FM is your home for all things music & audio – song info, lyrics, gear reviews & more.'
});
</script>
