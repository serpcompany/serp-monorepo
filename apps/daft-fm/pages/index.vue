<template>
  <div>
    <!-- hero -->
    <SHero
      headline="DAFT FM"
      subheadline="All Things Audible."
      :show-search-bar="false"
      :show-buttons="false"
    />

    <main>
      <div>
        <!-- link hub: songs -->
        <nuxt-link to="/songs/">
          <h2 class="mt-20">Songs</h2>
        </nuxt-link>
        <songs-link-hub :songs="songsData?.songs" />

        <!-- link hub: artists -->
        <nuxt-link to="/artists/">
          <h2 class="mt-20">Artists</h2>
        </nuxt-link>
        <artists-link-hub :artists="artistsData?.artists" />

        <!-- link hub: albums -->
        <nuxt-link to="/albums/">
          <h2 class="mt-20">Albums</h2>
        </nuxt-link>
        <albums-link-hub :albums="albumsData?.albums" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);

const songsData = await useSongs(page.value, limit.value);
if (!songsData) {
  router.push('/404');
}

const artistsData = await useArtists(page.value, limit.value);
if (!artistsData) {
  router.push('/404');
}

const albumsData = await useAlbums(page.value, limit.value);
if (!albumsData) {
  router.push('/404');
}

useSeoMeta({
  title: 'Home'
});
</script>
