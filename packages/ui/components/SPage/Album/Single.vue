<script setup lang="ts">
  import type {
    Artist, // Import Artist type
    ArtistReleaseGroup // Import ArtistReleaseGroup for typing
  } from '@serp/types/types';

  const sections = ['Overview', 'Songs'];
  const route = useRoute();
  const { slug } = route.params;
  const album = await useAlbum(encodeURIComponent(slug));

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  // Get upvotes
  const { upvotes } = (await useFetchWithCache<{ upvotes: string[] }>(
    `/upvotes/${encodeURIComponent(album.slug)}?module=album`
  )) || { upvotes: [] };

  const genres = computed(() => {
    return album?.genres ? album.genres.join(', ') : '';
  });

  const tags = computed(() => {
    return album?.tags ? album.tags.join(', ') : '';
  });

  // Format Date Helper (Year only)
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return dateString.split('-')[0] || dateString;
  };

  // Format Duration Helper (MM:SS)
  const formatDuration = (lengthMs: number | null): string => {
    if (lengthMs === null || lengthMs === undefined) {
      return '--:--';
    }
    const totalSeconds = Math.round(lengthMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Refined SEO Description
  const seoDescription = computed(
    () =>
      album?.seoDescription ||
      album?.overview?.substring(0, 160) ||
      `Details about the album ${album.name}.`
  );

  // Primary artist for linking
  const primaryArtist = computed(() => {
    if (album.artists && album.artists.length > 0) {
      return album.artists[0];
    }
    return null;
  });

  useSeoMeta({
    // Add Artist to title if available
    title: `${primaryArtist.value?.credit_name ? primaryArtist.value.credit_name + ' - ' : ''}${album.name} - Album Details`,
    description: seoDescription
  });

  // Ref for other albums by the same artist
  const otherArtistAlbums = ref<ArtistReleaseGroup[]>([]);

  // Fetch the full ARTIST data, and filter out the current album
  watchEffect(async () => {
    const artistSlug = primaryArtist.value?.slug;
    const currentAlbumSlug = album.slug; // Get current album slug

    if (artistSlug) {
      try {
        const fetchedArtistData = await useFetchWithCache<Artist>(
          `/artists/${encodeURIComponent(artistSlug)}`
        );
        // Filter the releaseGroups, excluding the current album
        otherArtistAlbums.value = (
          fetchedArtistData?.releaseGroups || []
        ).filter((rg: ArtistReleaseGroup) => rg.slug !== currentAlbumSlug);
      } catch (error) {
        otherArtistAlbums.value = [];
      }
    }
  });
</script>

<template>
  <div>
    <MultipageHeaderMusic
      :name="album.name"
      :sections="sections"
      class="bg-background sticky top-0 z-10 transition-all duration-300"
      serply-link="https://serp.ly/@daftfm/amazon/music/unlimited"
    >
      <!-- Display Artist Name in Header if available -->
      <template #subtitle>
        <NuxtLink
          v-if="primaryArtist"
          :to="`/artists/${primaryArtist.slug}/`"
          class="text-sm text-gray-500 hover:underline dark:text-gray-400"
        />
      </template>
      <template #upvote>
        <UpvoteButton
          v-if="useAuth"
          :id="encodeURIComponent(album.slug)"
          module="album"
          :upvotes="upvotes"
        />
      </template>
    </MultipageHeaderMusic>

    <!-- Main content wrapper -->
    <div class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Breadcrumbs -->
      <UBreadcrumb class="mb-6" :ui="{ container: 'flex px-1 py-2' }">
        <UBreadcrumbItem to="/home">Home</UBreadcrumbItem>
        <UBreadcrumbItem to="/albums">Albums</UBreadcrumbItem>
        <UBreadcrumbItem :to="`/albums/${album.slug}`">{{
          album.name
        }}</UBreadcrumbItem>
      </UBreadcrumb>

      <!-- Grid Layout -->
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Main Content Column (70%) -->
        <div class="space-y-8 lg:col-span-2">
          <!-- Songs / Tracklist Section -->
          <section id="songs" class="scroll-mt-24">
            <h2 class="mb-4 text-2xl font-semibold">Tracklist</h2>
            <UCard :ui="{ body: { padding: 'px-2 sm:px-4 py-3' } }">
              <ol
                v-if="album.recordings && album.recordings.length > 0"
                class="space-y-2"
              >
                <li
                  v-for="(song, index) in album.recordings"
                  :key="song.slug"
                  class="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 last:border-b-0 last:pb-0 dark:border-gray-700"
                >
                  <div class="flex min-w-0 items-center gap-3">
                    <span
                      class="w-5 text-right font-mono text-xs text-gray-500 dark:text-gray-400"
                      >{{ index + 1 }}.</span
                    >
                    <div class="truncate">
                      <NuxtLink
                        v-if="song.has_lyrics"
                        :to="`/songs/${song.slug}`"
                        class="text-primary-600 dark:text-primary-400 truncate text-sm font-medium hover:underline"
                        :title="song.name"
                      >
                        {{ song.name }}
                      </NuxtLink>
                      <span
                        v-else
                        class="truncate text-sm text-gray-800 dark:text-gray-200"
                        :title="song.name"
                        >{{ song.name }}</span
                      >
                    </div>
                  </div>
                  <span
                    class="flex-shrink-0 font-mono text-xs text-gray-500 dark:text-gray-400"
                    >{{ formatDuration(song.length) }}</span
                  >
                </li>
              </ol>
              <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                No tracklist available.
              </p>
            </UCard>
          </section>

          <!-- Overview Section -->
          <section id="overview" class="scroll-mt-24">
            <h2 class="mb-4 text-2xl font-semibold">Overview</h2>
            <div
              v-if="album.overview"
              class="prose dark:prose-invert max-w-none"
              v-html="album.overview"
            ></div>
            <p v-else class="text-gray-500 dark:text-gray-400">
              No overview available for this album.
            </p>
          </section>

          <!-- Other Albums by Artist Section -->
          <section
            v-if="primaryArtist && otherArtistAlbums.length > 0"
            id="other-albums"
            class="scroll-mt-24"
          >
            <h2 class="mb-4 text-2xl font-semibold">
              Other Albums by {{ primaryArtist.credit_name }}
            </h2>
            <div
              class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4"
            >
              <div
                v-for="otherAlbum in otherArtistAlbums"
                :key="otherAlbum.slug"
                class="group relative"
              >
                <NuxtLink
                  :to="`/albums/${otherAlbum.slug}`"
                  class="block space-y-1"
                >
                  <div
                    class="aspect-square overflow-hidden rounded-md bg-gray-100 shadow-sm transition-opacity group-hover:opacity-75 dark:bg-gray-800"
                  >
                    <!-- Using cover_art_urls (matches API example) with ts-ignore -->
                    <!-- eslint-disable-next-line @typescript-eslint/ban-ts-comment -->
                    <!-- @ts-ignore -->
                    <LazyNuxtImg
                      v-if="otherAlbum.cover_art_urls?.['250']"
                      :src="otherAlbum.cover_art_urls['250']"
                      :alt="`${otherAlbum.name} cover`"
                      class="h-full w-full object-cover"
                    />
                    <!-- Placeholder for missing art -->
                    <div
                      v-else
                      class="flex h-full w-full items-center justify-center"
                    >
                      <UIcon
                        name="i-heroicons-photo"
                        class="h-1/3 w-1/3 text-gray-400 dark:text-gray-600"
                      />
                    </div>
                  </div>
                  <p
                    class="group-hover:text-primary truncate text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {{ otherAlbum.name }}
                  </p>
                  <p
                    v-if="otherAlbum.date"
                    class="text-xs text-gray-500 dark:text-gray-400"
                  >
                    {{ formatDate(otherAlbum.date) }}
                  </p>
                </NuxtLink>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar Column (30%) -->
        <div class="space-y-6 lg:col-span-1">
          <!-- Album image -->
          <div v-if="album.coverArt?.['500']">
            <LazyNuxtImg
              :src="album.coverArt['500']"
              :alt="`${album.name} cover art`"
              class="w-full rounded-md object-cover shadow-md"
            />
          </div>

          <!-- Album Info Card -->
          <UCard>
            <template #header>
              <div class="font-medium">Album Info</div>
            </template>
            <div class="space-y-2 text-sm">
              <!-- Artist Link -->
              <div v-if="primaryArtist">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Artist:
                </span>
                <NuxtLink
                  :to="`/artists/${primaryArtist.slug}`"
                  class="text-primary hover:underline"
                >
                  {{ primaryArtist.credit_name }}
                </NuxtLink>
              </div>
              <div v-if="album.date">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Released:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{
                  formatDate(album.date)
                }}</span>
              </div>
              <div v-if="album.type">
                <span class="font-medium text-gray-700 dark:text-gray-300"
                  >Type:
                </span>
                <span class="text-gray-800 dark:text-gray-200">{{
                  album.type
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
