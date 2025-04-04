<script setup lang="ts">
  import type {
    UrlRelation // Import UrlRelation type
  } from '@serp/types/types';

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

  // Refine SEO description computation
  const seoDescription = computed(
    () =>
      artist?.seoDescription ||
      artist?.overview?.substring(0, 160) ||
      `Learn more about ${artist.name}.`
  );

  useSeoMeta({
    title: artist.name + ' - Songs, Albums, and More',
    description: seoDescription
  });

  // Helper to format date (optional, can be done inline)
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    // Basic year extraction, adjust if full date formatting is needed
    return dateString.split('-')[0] || dateString;
  };

  // Attempt to get image source info from Wikidata
  const artistImageUrl = computed(() => {
    // Check for filename in wikidata properties
    const filename = artist.wikidata?.properties?.image?.[0];
    if (filename) {
      // Transform the filename into a usable Wikimedia Commons URL
      // This uses the Wikimedia thumbnail service which doesn't require MD5 hashing
      const encodedFilename = encodeURIComponent(filename);
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedFilename}?width=400`;
    }

    // Alternative: check urlRels for image type
    if (artist.urlRels && Array.isArray(artist.urlRels)) {
      const imageRel = artist.urlRels.find(
        (rel: UrlRelation) => rel.type === 'image'
      );
      if (imageRel?.url) {
        return imageRel.url;
      }
    }

    // Fallback if no image found
    return null;
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

    <!-- Main content wrapper -->
    <div class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Breadcrumbs -->
      <UBreadcrumb class="mb-6" :ui="{ container: 'flex px-1 py-2' }">
        <UBreadcrumbItem to="/home">Home</UBreadcrumbItem>
        <UBreadcrumbItem to="/artists">Artists</UBreadcrumbItem>
        <UBreadcrumbItem :to="`/artists/${artist.slug}`">{{
          artist.name
        }}</UBreadcrumbItem>
      </UBreadcrumb>

      <!-- Grid Layout -->
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Main Content Column (70%) -->
        <div class="space-y-8 lg:col-span-2">
          <!-- Albums Section - Refactored -->
          <section id="albums" class="scroll-mt-24">
            <h2 class="mb-4 text-2xl font-semibold">
              {{ artist.name }} Albums
            </h2>
            <div class="space-y-6">
              <UCard v-for="album in artist?.releaseGroups" :key="album.slug">
                <template #header>
                  <div class="flex items-center justify-between">
                    <NuxtLink
                      :to="`/albums/${album.slug}`"
                      class="text-primary text-lg font-medium hover:underline"
                    >
                      {{ album.name }}
                    </NuxtLink>
                    <UBadge v-if="album.date" color="gray" variant="subtle">{{
                      formatDate(album.date)
                    }}</UBadge>
                  </div>
                </template>

                <div class="flex flex-col gap-4 sm:flex-row">
                  <!-- Album Cover -->
                  <div
                    v-if="album.coverArt?.['250']"
                    class="flex-shrink-0 sm:w-1/4"
                  >
                    <NuxtLink :to="`/albums/${album.slug}`">
                      <LazyNuxtImg
                        :src="album.coverArt['250']"
                        :alt="`${album.name} cover`"
                        class="w-full rounded object-cover shadow-sm"
                      />
                    </NuxtLink>
                  </div>

                  <!-- Tracklist -->
                  <div class="flex-grow sm:w-3/4">
                    <h4
                      class="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                    ></h4>
                    <ol
                      v-if="album.recordings && album.recordings.length > 0"
                      class="list-inside list-decimal space-y-1 text-sm"
                    >
                      <li v-for="song in album.recordings" :key="song.slug">
                        <NuxtLink
                          v-if="song.has_lyrics"
                          :to="`/songs/${song.slug}`"
                          class="text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          {{ song.name }}
                        </NuxtLink>
                        <span v-else class="text-gray-700 dark:text-gray-300">{{
                          song.name
                        }}</span>
                      </li>
                    </ol>
                    <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                      No tracklist available.
                    </p>
                  </div>
                </div>
              </UCard>
              <p
                v-if="
                  !artist?.releaseGroups || artist.releaseGroups.length === 0
                "
                class="text-gray-500 dark:text-gray-400"
              >
                No albums found for this artist.
              </p>
            </div>
          </section>

          <!-- Songs section placeholder if needed separately -->
          <section id="songs" class="scroll-mt-24">
            <!-- Can list individual songs here if desired, separate from albums -->
          </section>
        </div>

        <!-- Sidebar Column (30%) -->
        <div class="space-y-6 lg:col-span-1">
          <!-- Artist Image -->
          <div v-if="artistImageUrl">
            <LazyNuxtImg
              :src="artistImageUrl"
              :alt="artist.name"
              class="w-full rounded-md object-cover shadow-md"
            />
          </div>
          <!-- Fallback placeholder -->
          <div
            v-else
            class="flex aspect-square items-center justify-center rounded-md bg-gray-100 shadow-sm dark:bg-gray-800"
          >
            <UIcon
              name="i-heroicons-user"
              class="h-1/3 w-1/3 text-gray-400 dark:text-gray-600"
            />
          </div>

          <!-- Overview Card (Added to Sidebar) -->
          <UCard v-if="artist.overview">
            <template #header>
              <div class="font-medium">Overview</div>
            </template>
            <div
              class="prose prose-sm dark:prose-invert max-w-none"
              v-html="artist.overview"
            ></div>
          </UCard>

          <!-- General Info Card -->
          <UCard>
            <template #header>
              <div class="font-medium">Artist Info</div>
            </template>
            <div class="space-y-2 text-sm">
              <div
                class="mb-2 text-lg font-semibold text-gray-900 dark:text-white"
              >
                {{ artist.name }}
              </div>
              <div v-if="artist.artistType">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Type:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{
                  artist.artistType
                }}</span>
              </div>
              <div v-if="artist.beginDate">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Active From:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{
                  formatDate(artist.beginDate)
                }}</span>
              </div>
              <div v-if="artist.endDate">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Active Until:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{
                  formatDate(artist.endDate)
                }}</span>
              </div>
              <div v-if="artist.area">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Area:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{
                  artist.area
                }}</span>
              </div>
              <div v-if="artist.beginArea">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Origin:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{
                  artist.beginArea
                }}</span>
              </div>
              <div v-if="artist.gender">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Gender:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{
                  artist.gender
                }}</span>
              </div>
            </div>
          </UCard>

          <!-- Stats Card -->
          <UCard v-if="genres || tags">
            <template #header>
              <div class="font-medium">Stats</div>
            </template>
            <div class="space-y-2 text-sm">
              <div v-if="genres">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Genres:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{
                  genres
                }}</span>
              </div>
              <div v-if="tags">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Tags:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{ tags }}</span>
              </div>
            </div>
          </UCard>

          <!-- Links Card -->
          <UCard>
            <template #header>
              <div class="font-medium">Listen On</div>
            </template>
            <div class="p-1">
              <UButton
                to="https://serp.ly/@daftfm/amazon/music/unlimited"
                size="lg"
                block
                color="primary"
                variant="soft"
                class="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
              >
                Amazon Music
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
