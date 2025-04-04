<script setup lang="ts">
  import type {
    Artist,
    ArtistReleaseGroup,
    ArtistRelation
  } from '@serp/types/types';

  const sections = ['Lyrics'];
  const route = useRoute();
  const { slug } = route.params;
  const song = await useSong(encodeURIComponent(slug));

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  // Get upvotes
  const { upvotes } = (await useFetchWithCache<{ upvotes: string[] }>(
    `/upvotes/${encodeURIComponent(song.slug)}?module=song`
  )) || { upvotes: [] };

  // Get the full album data to access its recordings
  const fullAlbum = song.releaseGroup
    ? await useAlbum(song.releaseGroup.slug)
    : null;

  // Determine the primary artist using multiple fallback options
  const artistData = computed(() => {
    // First try: song.artists (default and most direct)
    if (song.artists && song.artists.length > 0) {
      return {
        name: song.artists[0].credit_name,
        slug: song.artists[0].slug
      };
    }

    // Second try: song.artistRels
    if (song.artistRels && song.artistRels.length > 0) {
      return {
        name: song.artistRels[0].artistName,
        slug: song.artistRels[0].artistSlug
      };
    }

    // Third try: song.releaseGroup?.artists
    if (song.releaseGroup?.artists && song.releaseGroup?.artists.length > 0) {
      return {
        name: song.releaseGroup.artists[0].creditName,
        slug: song.releaseGroup.artists[0].slug
      };
    }

    // Fourth try: search for composer or lyricist in artistRels
    if (song.artistRels && song.artistRels.length > 0) {
      const composer = song.artistRels.find(
        (rel: ArtistRelation) =>
          rel.type === 'composer' || rel.type === 'lyricist'
      );
      if (composer) {
        return {
          name: composer.artistName,
          slug: composer.artistSlug
        };
      }
    }

    // Last resort fallback
    return {
      name: 'Unknown Artist',
      slug: ''
    };
  });

  // Set SEO meta
  useSeoMeta({
    title: `${artistData.value.name !== 'Unknown Artist' ? artistData.value.name + ' - ' : ''}${song.name} - Lyrics`,
    description: song.seoDescription || ''
  });

  // Get other albums by the same artist
  const artistAlbums = ref<ArtistReleaseGroup[]>([]);

  // Fetch the full ARTIST data, which contains releaseGroups
  watchEffect(async () => {
    const currentSlug = artistData.value.slug;
    if (currentSlug) {
      try {
        // Fetch the main Artist object instead of the dedicated /albums endpoint
        const fetchedArtistData = await useFetchWithCache<Artist>(
          `/artists/${encodeURIComponent(currentSlug)}`
        );
        // Extract the releaseGroups array from the artist data
        artistAlbums.value = fetchedArtistData?.releaseGroups || [];
      } catch (error) {
        artistAlbums.value = [];
      }
    }
  });

  // Include ALL album songs, including the current one
  const albumSongs = computed(() => {
    if (!fullAlbum?.recordings) return [];
    // Remove the filter to include the current song
    return fullAlbum.recordings;
    // return fullAlbum.recordings.filter( // Old logic
    //   (recording: ReleaseGroupRecording) => recording.slug !== song.slug
    // );
  });

  const genres = computed(() => {
    return song?.genres ? song.genres.join(', ') : '';
  });

  const tags = computed(() => {
    return song?.tags ? song.tags.join(', ') : '';
  });
</script>

<template>
  <UPage>
    <SchemaMusicRecording :song="song" />
    <MultipageHeaderMusic
      :name="`${song.name} by ${artistData.name}`"
      :sections="sections"
      class="bg-background sticky top-0 z-10 transition-all duration-300"
      serply-link="https://serp.ly/@daftfm/amazon/music/unlimited"
    >
      <template #upvote>
        <UpvoteButton
          v-if="useAuth"
          :id="encodeURIComponent(song.slug)"
          module="song"
          :upvotes="upvotes"
        />
      </template>
    </MultipageHeaderMusic>

    <!-- Main content with grid -->
    <div class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Breadcrumbs -->
      <UBreadcrumb class="mb-6" :ui="{ container: 'flex px-1 py-2' }">
        <UBreadcrumbItem to="/home">Home</UBreadcrumbItem>
        <UBreadcrumbItem to="/songs">Songs</UBreadcrumbItem>
        <UBreadcrumbItem :to="`/songs/${song.slug}`">{{
          song.name
        }}</UBreadcrumbItem>
      </UBreadcrumb>

      <!-- Main Content (70) -->
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <!-- Song content -->
          <div id="lyrics">
            <h2 class="mb-4 text-xl font-semibold">{{ song.name }} Lyrics</h2>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div
              class="prose dark:prose-invert max-w-none whitespace-pre-line"
              v-html="song.lyrics"
            ></div>
          </div>
        </div>

        <!-- Sidebar (30%) -->
        <div class="space-y-6 lg:col-span-1">
          <!-- Add Album Cover Art -->
          <div v-if="song.releaseGroup?.cover_art?.['500']">
            <LazyNuxtImg
              :src="song.releaseGroup.cover_art['500']"
              :alt="`${song.releaseGroup.name || 'Album'} cover art`"
              class="w-full rounded-md object-cover shadow-md"
            />
          </div>

          <!-- Song Info Section -->
          <UCard>
            <template #header>
              <div class="font-medium">Song Info</div>
            </template>
            <div class="space-y-2">
              <div v-if="artistData.name !== 'Unknown Artist'" class="mb-2">
                <span class="font-medium">Artist: </span>
                <NuxtLink
                  :to="`/artists/${artistData.slug}`"
                  class="text-primary hover:underline"
                >
                  {{ artistData.name }}
                </NuxtLink>
              </div>
              <div v-if="song.releaseGroup">
                <span class="font-medium">Album: </span>
                <NuxtLink
                  :to="`/albums/${song.releaseGroup.slug}`"
                  class="text-primary hover:underline"
                >
                  {{ song.releaseGroup.name }}
                </NuxtLink>
              </div>
              <div v-if="genres">
                <span class="font-medium">Genres:</span> {{ genres }}
              </div>
              <div v-if="tags">
                <span class="font-medium">Tags:</span> {{ tags }}
              </div>
              <div v-if="song.overview" class="pt-2">
                {{ song.overview }}
              </div>
            </div>
          </UCard>

          <!-- Album Songs Section -->
          <UCard v-if="song.releaseGroup && albumSongs.length > 0">
            <template #header>
              <div class="font-medium">
                {{ song.releaseGroup.name }} Tracklist
              </div>
            </template>
            <!-- Use <ol> for numbered list -->
            <ol class="list-inside list-decimal space-y-2 pl-4">
              <li v-for="albumSong in albumSongs" :key="albumSong.slug">
                <NuxtLink
                  :to="`/songs/${albumSong.slug}`"
                  class="text-primary hover:underline"
                >
                  {{ albumSong.name }}
                </NuxtLink>
              </li>
            </ol>
          </UCard>

          <!-- Artist's Other Albums Section -->
          <UCard
            v-if="
              artistData.name !== 'Unknown Artist' && artistAlbums.length > 0
            "
          >
            <template #header>
              <div class="font-medium">
                Other Albums by {{ artistData.name }}
              </div>
            </template>
            <div class="space-y-2">
              <NuxtLink
                v-for="(album, index) in artistAlbums"
                :key="index"
                :to="album?.slug ? `/albums/${album.slug}` : '#'"
                class="flex items-center justify-between rounded p-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span class="text-primary">{{
                  album?.name || 'Unknown Album'
                }}</span>
                <UBadge v-if="album?.date" size="sm" color="gray">
                  {{ album.date }}
                </UBadge>
              </NuxtLink>
            </div>
          </UCard>

          <!-- Listen Section -->
          <UCard>
            <template #header>
              <div class="font-medium">Listen on</div>
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
  </UPage>
</template>
