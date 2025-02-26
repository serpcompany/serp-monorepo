<template>
  <div>

    <multipage-header
                      :name="song.name"
                      :sections="sections"
                      class="bg-background sticky top-0 z-10 transition-all duration-300" />

    <!-- Main content with grid -->
    <div class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Main Content (70) -->
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div>
            <!-- section: overview -->
            <h2 id="lyrics" class="flex scroll-mt-60 flex-row">
              {{ song.name }} Lyrics
            </h2>
            <div v-html="song.lyrics"></div>
          </div>
        </div>

        <!-- Sidebar (30%) -->
        <div class="space-y-6 lg:col-span-1">
          <!-- General Info Section -->
          <div>
            {{ song.overview }}
          </div>
          <div class="border p-4">
            <ul class="list-disc pl-4">
            </ul>
          </div>

          <!-- Stats Section -->
          <div class="border p-4">
            <div>
              <div v-if="genres">
                <span>Genres: {{ genres }}</span>
              </div>
              <br />
              <div v-if="tags">
                <span>Tags: {{ tags }}</span>
              </div>
            </div>
          </div>

          <!-- Links Section -->
          <div class="border p-4">
            <div class="flex space-y-4">
              <div>
                <nuxt-link to="https://serp.ly/@daftfm/amazon/music/unlimited">Amazon Music</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sections = ['Lyrics'];
const route = useRoute();
const { slug } = route.params;
const song = await useSong(slug);

const genres = computed(() => {
  return song?.genres ? song.genres.join(', ') : '';
});

const tags = computed(() => {
  return song?.tags ? song.tags.join(', ') : '';
});

const seoTitle = computed(() => song?.seoTitle);
const seoDescription = computed(() => song?.seoDescription);

useSeoMeta({
  title: seoTitle,
  description: seoDescription
});
</script>
