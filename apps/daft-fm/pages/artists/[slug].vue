<template>
  <div>
    <multipage-header
                      :name="artist.name"
                      :sections="sections"
                      class="bg-background sticky top-0 z-10 transition-all duration-300" />

    <!-- Main content with grid -->
    <div class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Main Content (70%) -->
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div>
            <!-- section: overview -->
            <h2 id="overview" class="scroll-mt-60">About {{ artist.name }}</h2>
            <div class="prose dark:prose-invert" v-html="artist.overview"></div>

            <h2 id="albums" class="scroll-mt-60">{{ artist.name }} Albums</h2>
            <div v-for="album in artist?.releaseGroups" :key="album.slug">
              <!-- Album Section -->
              <div>
                <div class="flex">
                  <nuxt-link
                             aria-label="link to the album"
                             :to="`/albums/${album.slug}/`">
                    <div>
                      <lazy-nuxt-img
                                     :src="album.coverArt?.['500']"
                                     :alt="album.name" />
                      {{ album.name }}
                    </div>
                  </nuxt-link>
                  <div>
                    <!-- Songs for the Album -->
                    <ol>
                      <li v-for="song in album.recordings" :key="song.slug">
                        <div>
                          <div>
                            {{ song.position }}.
                            <nuxt-link
                                       v-if="song.hasLyrics"
                                       :to="`/songs/${song.slug}/`">
                              {{ song.name }}
                            </nuxt-link>
                            <span v-else>{{ song.name }}</span>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Sidebar (30%) -->
        <div class="space-y-6 lg:col-span-1">
          <!-- General Info Section -->
          <div class="border p-4">
            <ul class="list-disc pl-4">
              <li>Founded: {{ artist.beginArea }}</li>
              <li>From: {{ artist.beginDate }}</li>
              <li>Dissolved: {{ artist.endDate }}</li>
            </ul>
          </div>

          <!-- Links Section -->
          <div class="border p-4">
            <div class="flex space-y-4">
              <div>
                <nuxt-link to="https://serp.ly/@daftfm/amazon/music/unlimited">Amazon Music</nuxt-link>
              </div>
            </div>
          </div>

          <!-- Stats Section -->
          <div class="border p-4">
            <div>
              <div>
                <span>Genres: {{ genres }}</span>
              </div>
              <br />
              <div>
                <span>Tags: {{ tags }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sections = ['Overview', 'Albums', 'Songs'];
const route = useRoute();
const { slug } = route.params;
const artist = await useArtist(slug);

const genres = computed(() => {
  return artist?.genres ? artist.genres.join(', ') : '';
});

const tags = computed(() => {
  return artist?.tags ? artist.tags.join(', ') : '';
});

const seoTitle = computed(() => artist?.seoTitle);
const seoDescription = computed(() => artist?.seoDescription);

useSeoMeta({
  title: seoTitle,
  description: seoDescription
});
</script>
