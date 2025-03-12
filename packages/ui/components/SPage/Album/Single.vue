<template>
  <div>
    <multipage-header
      :name="album.name"
      :sections="sections"
      class="bg-background sticky top-0 z-10 transition-all duration-300"
    />

    <!-- Main content with grid -->
    <div class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Main Content (70) -->
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div>
            <!-- section: overview -->
            <div id="overview" class="scroll-mt-60">
              {{ album.overview }}
            </div>

            <!-- section: song list -->
            <section id="songs" class="mx-auto max-w-6xl scroll-mt-60 p-6">
              <div
                v-for="song in album.recordings"
                :key="song.slug"
                class="flex items-center justify-between"
              >
                <div class="flex flex-1 items-center space-x-4">
                  <span class="w-6">{{ song.position }}</span>
                  <nuxt-link
                    v-if="song.has_lyrics"
                    :to="`/songs/${song.slug}/`"
                    >{{ song.name }}</nuxt-link
                  >
                  <span v-else>{{ song.name }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-16 text-right"></span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- Sidebar (30%) -->
        <div class="space-y-6 lg:col-span-1">
          <!-- Album image -->
          <lazy-nuxt-img
            :src="album.coverArt?.['500']"
            :alt="`${album.name} cover art`"
          />
          <div v-if="album.date" class="border p-4">
            <ul class="list-disc pl-4">
              <li data-testid="release-date">Released: {{ album.date }}</li>
            </ul>
          </div>

          <!-- Stats Section -->
          <div class="border p-4">
            <div>
              <div>
                <span>Genres: {{ genres }}</span>
              </div>
              <br >
              <div v-if="tags">
                <span>Tags: {{ tags }}</span>
              </div>
            </div>
          </div>

          <!-- Links Section -->
          <div class="border p-4">
            <div class="flex space-y-4">
              <div>
                <nuxt-link to="https://serp.ly/@daftfm/amazon/music/unlimited"
                  >Amazon Music</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sections = ['Overview', 'Songs'];
const route = useRoute();
const { slug } = route.params;
const album = await useAlbum(slug);

const genres = computed(() => {
  return album?.genres ? album.genres.join(', ') : '';
});

const tags = computed(() => {
  return album?.tags ? album.tags.join(', ') : '';
});

const seoTitle = computed(() => album?.seoTitle);
const seoDescription = computed(() => album?.seoDescription);

useSeoMeta({
  title: album.name + ' - Album',
  description: seoDescription
});
</script>
