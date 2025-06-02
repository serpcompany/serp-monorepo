<script setup lang="ts">
import type { Post } from '@serp/types/types'

const props = defineProps<{
  data: Post
  module: string
}>()
const config = useRuntimeConfig()
const useAuth = config.public.useAuth

const data = toRef(props, 'data')

const isValidAuthor
    = data.value.author !== undefined
      && data.value.author !== null
      && data.value.author !== 'None'

let comments = data.value.comments || []
if (useAuth) {
  const commentsData = await usePostComments(data.value.id)
  comments = commentsData.comments
}
</script>

<template>
  <UMain>
    <section class="mb-8">
      <SectionHeroOne :title="data.title || data.name" />
      <SPill base-slug="posts/category" :items="data.categories || []" />
    </section>
    <div class="items-end justify-between lg:flex">
      <div v-if="isValidAuthor">
        Author: {{ data.author }}
      </div>
      <div v-if="data?.createdAt">
        Published: {{ data.createdAt }}
      </div>
    </div>
    <USeparator class="my-4">
      <SLogo />
    </USeparator>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <article
      class="prose dark:prose-invert mb-20"
      v-html="data.content"
    />

    <!-- link hub for other posts -->
    <UPageSection v-if="module === 'movies'" title="More Posts">
      <LazyMoviePostLinkHub />
    </UPageSection>

    <NewsletterSignupPageSection />

    <!-- Comments Section -->
    <div v-if="useAuth" class="mt-10">
      <h2 class="mb-4 text-2xl font-bold">
        Comments
      </h2>
      <CommentsContainer
        :id="data.id"
        module="posts"
        :comments="comments || []"
        class="comments-github-style"
      />
    </div>
  </UMain>
</template>

<style>
  .comments-github-style {
  border-radius: 6px;
  margin-top: 16px;
}
</style>
