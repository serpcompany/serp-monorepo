<template>
  <div>
    <!-- hero -->
    <s-hero
            headline="DAFT FM"
            subheadline="All Things Audible."
            :show-search-bar="false"
            :show-buttons="false" />

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

      <!-- rows: shop -->
      <nuxt-link to="/shop/">
        <h2 class="mt-20">Shop</h2>
      </nuxt-link>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <post-card
                   v-for="post in shopData.posts"
                   :key="post.id"
                   :post="post"
                   :base-slug="`${post.module}/best/`"
                   article-class="py-2" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const page = ref(Number(route.query.page) || 1);
const limit = ref(Number(route.query.limit) || 50);

const shopData = await usePosts(page.value, limit.value, '', 'shop');
if (!shopData) {
  router.push('/404');
}

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
