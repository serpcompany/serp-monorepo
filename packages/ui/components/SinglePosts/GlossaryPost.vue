<template>
  <div>
    <div class="mt-10 grid grid-cols-1 lg:grid-cols-3">
      <div class="col-span-2 pb-10">
        <h1 class="text-4xl font-bold lg:text-6xl">{{ data.title }}</h1>
        <p v-if="data.oneLiner" class="prose dark:prose-invert mt-4">
          {{ data.oneLiner }}
        </p>
      </div>
      <div class="col-span-1 pb-10">
        <s-script-you-tube-player
          v-if="data.videoId"
          ref="video"
          :video-id="data.videoId"
          @ready="isLoaded = true"
          @state-change="stateChange"
        >
          <template #awaitingLoad>
            <div
              class="absolute top-1/2 left-1/2 h-[48px] w-[68px] -translate-x-1/2 -translate-y-1/2 transform"
            >
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  fill="#f00"
                />
                <path d="M 45,24 27,14 27,34" fill="#fff" />
              </svg>
            </div>
          </template>
        </s-script-you-tube-player>
      </div>

      <u-separator class="col-span-3 my-4">
        <s-logo />
      </u-separator>

      <!-- main section -->
      <div class="prose dark:prose-invert col-span-2">
        <article v-html="data.content"></article>
        <div v-if="data.relatedPosts && data.relatedPosts.length === 0">
          <h2>Related Posts</h2>
          <ul>
            <li>Term 1</li>
            <li>Term 2</li>
            <li>Term 3</li>
          </ul>
        </div>
      </div>

      <!-- sidebar -->
      <div class="col-span-1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@serp/types/types';

const isLoaded = ref(false);
const isPlaying = ref(false);
const video = ref();

defineProps<{
  data: Post;
}>();

function stateChange(event: { data: number }) {
  isPlaying.value = event.data === 1;
}
</script>
