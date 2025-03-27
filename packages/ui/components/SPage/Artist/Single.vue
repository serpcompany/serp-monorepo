<script setup lang="ts">
  const sections = ['Overview', 'Albums', 'Songs'];
  const route = useRoute();
  const { slug } = route.params;
  const artist = await useArtist(encodeURIComponent(slug));

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  // Get upvotes
  const { upvotes } = (await useFetchWithCache<{ upvotes: string[] }>(
    `/upvotes/${encodeURIComponent(artist.slug)}?module=artist`
  )) || { upvotes: [] };

  const genres = computed(() => {
    return artist?.genres ? artist.genres.join(', ') : '';
  });

  const tags = computed(() => {
    return artist?.tags ? artist.tags.join(', ') : '';
  });

  const seoDescription = computed(() => artist?.seoDescription);

  useSeoMeta({
    title: artist.name + ' - Songs, Albums, and More',
    description: seoDescription
  });
</script>

<template>
  <div>
    <MultipageHeaderMusic
      :name="artist.name"
      :sections="sections"
      class="bg-background sticky top-0 z-10 transition-all duration-300"
      serply-link="https://serp.ly/@daftfm/amazon/music/unlimited"
    >
      <template #upvote>
        <UpvoteButton
          v-if="useAuth"
          :id="encodeURIComponent(artist.slug)"
          module="artist"
          :upvotes="upvotes"
        />
      </template>
    </MultipageHeaderMusic>

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
                  <NuxtLink
                    aria-label="link to the album"
                    :to="`/albums/${encodeURIComponent(album.slug)}/`"
                  >
                    <div>
                      <LazyNuxtImg
                        :src="album.cover_art_urls?.['500']"
                        :alt="album.name"
                      />
                      {{ album.name }}
                    </div>
                  </NuxtLink>
                  <div>
                    <!-- Songs for the Album -->
                    <ol>
                      <li v-for="song in album.recordings" :key="song.slug">
                        <div>
                          <div>
                            {{ song.position }}.
                            <NuxtLink
                              v-if="song.has_lyrics"
                              :to="`/songs/${encodeURIComponent(song.slug)}/`"
                            >
                              {{ song.name }}
                            </NuxtLink>
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
                <NuxtLink to="https://serp.ly/@daftfm/amazon/music/unlimited"
                  >Amazon Music</NuxtLink
                >
              </div>
            </div>
          </div>

          <!-- Stats Section -->
          <div class="border p-4">
            <div>
              <div>
                <span>Genres: {{ genres }}</span>
              </div>
              <br >
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
