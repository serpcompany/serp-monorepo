<script setup lang="ts">
  import type { Post } from '@serp/types/types'

  const props = defineProps<{
    data: Post
  }>()
  const config = useRuntimeConfig()
  const useAuth = config.public.useAuth

  const data = toRef(props, 'data')

  let comments = data.value.comments || []
  const commentsData = await usePostComments(data.value.id)
  comments = commentsData.comments

  // Video ref for the YouTube player
  const videoRef = ref<HTMLElement | null>(null)

  // Function to set the video ref
  function setVideoRef(el: HTMLElement | null) {
    if (el) {
      videoRef.value = el
    }
  }
</script>

<template>
  <div>
    <div class="mt-10 grid grid-cols-1 lg:grid-cols-3">
      <div class="col-span-2 pb-10">
        <h1 class="text-4xl font-bold lg:text-6xl">
          {{ data.keyword || data.title || data.name }}
        </h1>
        <p v-if="data.oneLiner" class="prose dark:prose-invert mt-4">
          {{ data.oneLiner }}
        </p>
      </div>
      <div class="col-span-1 pb-10">
        <SScriptYouTubePlayer
          v-if="data.videoId"
          :ref="(el) => setVideoRef(el as HTMLElement)"
          :video-id="data.videoId"
          thumbnail-size="maxresdefault"
        >
          <template #awaitingLoad>
            <div
              class="absolute top-1/2 left-1/2 h-[48px] w-[68px] -translate-x-1/2 -translate-y-1/2 transform"
            >
              <svg
                height="100%"
                version="1.1"
                viewBox="0 0 68 48"
                width="100%"
              >
                <path
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  fill="#f00"
                />
                <path d="M 45,24 27,14 27,34" fill="#fff" />
              </svg>
            </div>
          </template>
        </SScriptYouTubePlayer>
      </div>

      <USeparator class="col-span-3 my-4">
        <SLogo />
      </USeparator>

      <!-- main section -->
      <div class="prose dark:prose-invert col-span-2">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <article v-html="data.content"></article>
        <div v-if="data.relatedPosts && data.relatedPosts.length === 0">
          <h2>Related Posts</h2>
          <ul>
            <li>Term 1</li>
            <li>Term 2</li>
            <li>Term 3</li>
          </ul>
        </div>

        <!-- Comments Section -->
        <div v-if="useAuth" class="mt-10">
          <h2 class="mb-6 text-3xl font-bold">
            Comments
          </h2>
          <CommentsContainer
            :id="data.id"
            module="posts"
            :comments="comments || []"
            class="comments-github-style"
          />
        </div>
      </div>

      <!-- sidebar -->
      <div class="col-span-1"></div>
    </div>
  </div>
</template>

<style>
.comments-github-style {
  border: 1px solid var(--color-border, #d0d7de);
  border-radius: 6px;
  margin-top: 16px;
}

.comments-github-style .innerWrapper {
  padding: 16px;
}

.comments-github-style .comment-wrapper {
  border-top: 1px solid var(--color-border, #d0d7de);
  padding-top: 16px;
  margin-top: 16px;
}

.comments-github-style .comment-wrapper:first-child {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.comments-github-style .wrapper {
  display: flex;
  gap: 16px;
}

.comments-github-style .addComment {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.comments-github-style .commentBox {
  flex: 1;
  border: 1px solid var(--color-border, #d0d7de);
  border-radius: 6px;
  padding: 8px;
}

.comments-github-style .commentBox textarea {
  width: 100%;
  min-height: 100px;
  padding: 8px;
  border-radius: 3px;
}

.comments-github-style .commentBox button {
  margin-top: 8px;
  padding: 5px 16px;
  border-radius: 6px;
  color: white;
}

.comments-github-style .name-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.comments-github-style .time {
  color: #768390;
  font-size: 0.85em;
}

.comments-github-style .comment {
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 8px;
}

.dark .comments-github-style .comment {
  background-color: #0d1117;
  border-color: #30363d;
}
</style>
